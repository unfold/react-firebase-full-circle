import Firebase from 'firebase'

const ref = new Firebase('https://react-full-circle.firebaseio.com/')

export default {
  message: {
    add(values) {
      let addRef = ref.child('messages').push(values)
      ref.child('feed').child(addRef.key()).set(true)
    }
  }
}