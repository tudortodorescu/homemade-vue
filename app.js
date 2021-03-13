
import Tdr from './Tdr/Tdr.js'

new Tdr({
  el: '#app',
  template: `
    <div style="
      padding: 20px;
      border: 2px solid #000;
      margin: 10px;
    ">
      <h1>{{ message }}</h1>
      <section>
        <a href="">{{ link }}</a>
        <button @click="changeToRandomMessage">a button</button>
      </section>
      <p>{{ message }}</p>
    </div>
  `,
  data() {
    return {
      message: 'hello',
      link: 'google.com'
    }
  },
  methods: {
    changeToRandomMessage( event ) {
      this.$data.message = this.$methods.generateUid()
    },
    generateUid(
      length = 4,
      chars = '0123456789abcdefghijklmnopqrstuvwxyz'
    ) {
        let str = '';
        for (let i = length; i > 0; --i) {
            str += chars[ Math.floor(Math.random() * chars.length) ];
        }
      
        return str;
    }
  }
})

window.app = document.getElementById('app')
