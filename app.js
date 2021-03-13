
import Tdr from './Tdr/Tdr.js'

new Tdr({
  el: '#app',
  template: `
    <span>{{ message }}</span>
    <section>
      <a href="">{{ link }}</a>
      <button @click="changeMessage( 'new message' )">a button</button>
    </section>
    <p>{{ message }}</p>
  `,
  data: _ => ({
    message: 'hello',
    link: 'google.com'
  }),
  methods: {
    changeMessage( value ) {
      this.$data.message = value
    }
  }
})

window.app = document.getElementById('app')
