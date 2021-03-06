import './styles.css'
import SampleEntry from './SampleEntry.vue'
import { addValidationMixin } from './common'
import { createFormInjection, addQuestionType } from '@vote/api'

createFormInjection(hooks => {
  addQuestionType('VSample', SampleEntry)
  addValidationMixin()
  hooks.on('question:update', ({ question, value }) => {
    if (question.type === 'VText') {
      if (/hello(,)? ?world/i.test(value)) {
        question.vueInstance.$nextTick(function () {
          question.vueInstance.value_ = value.replace(/hello(,)? ?world/gi, 'Hello, World')
        })
      }
    }
  })
})
