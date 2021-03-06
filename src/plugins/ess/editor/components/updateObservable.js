/**
 * Vue mixin to create a observable compoonent.
 * @param {function} updateFunction function to call on update
 */
export default updateFunction => ({
  data () {
    return {
      change: {},
      changed: false,
      lastChanged: Date.now(),
      lastUpdated: Date.now(),
      saveState: 'notChanged',
      intervalId: -1,
      UPDATE_THRESHOLD: {
        // After data.UPDATE_THRESHOLD.NOT_CHANGED ms without change, update
        NOT_CHANGED: 2 * 1000, // 3 secs
        // After data.UPDATE_THRESHOLD.NOT_UPDATED ms without update, update
        NOT_UPDATED: 10 * 1000, // 10 secs
      },
    }
  },
  watch: {
    saveState (val) {
      this.$emit('update:saveState', val)
    },
  },
  methods: {
    /** Call this funtion to manually update. */
    async update () {
      if (!this.changed) return
      this.changed = false
      const change = this.change
      this.change = {}
      this.saveState = 'saving'
      try { await updateFunction(this, change) } catch (e) {
        this.saveState = 'error'
        // TODO
        alert(this.$t('plugin.ess.updateError'))
        console.log('update error', e)
        return
      }
      if (!this.changed) this.saveState = 'saved'
      this.lastUpdated = Date.now()
    },
    /** Call this function to mark a change or user input. */
    logChange () {
      this.changed = true
      this.lastChanged = Date.now()
      this.saveState = 'awaitInputStop'
    },
    /** @private */
    checkUpdate () {
      if (!this.changed) return
      if (this.lastChanged + this.UPDATE_THRESHOLD.NOT_CHANGED < Date.now()) {
        return this.update()
      }
      if (this.lastUpdated + this.UPDATE_THRESHOLD.NOT_UPDATED < Date.now()) {
        return this.update()
      }
    },
  },
  mounted () {
    this.intervalId = setInterval(() => this.checkUpdate(), 500)
  },
})
