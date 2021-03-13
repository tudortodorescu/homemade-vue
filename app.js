
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
        <input 
          :value="name" 
          @input="changeName"
        />
        <a href="">{{ link }}</a>
        <button @click="changeToRandomMessage">randomize</button>
      </section>
      <p>
        <strong>Message: </strong>
        <span>{{ message }}</span>
      </p>
      <p>
        <strong>Name: </strong>
        <span>{{ name }}</span>
      </p>
    </div>
  `,
  data() {
    return {
      message: 'hello',
      link: 'google.com',
      name: 'Tudor'
    }
  },
  methods: {
    changeName( event ) {
      this.$data.name = event.target.value
    },
    changeToRandomMessage( event ) {
      const randomString = this.$methods.randomString()
      this.$data.message = randomString || '- empty -'
    },
    randomString() {
      const from = this.randomNumber()   
      const to = Math.abs( from - this.randomNumber() )   
      
      return Math.random().toString( from ).substring( to )
    },
    randomNumber() {
      return Math.floor((Math.random() * 36) + 2);
    },
  }
})

window.app = document.getElementById('app')
