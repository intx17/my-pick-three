import firebase from '~/plugins/firebase'

export default function (): Promise<firebase.User | null> {
  return new Promise(function (resolve) {
    firebase.auth().onAuthStateChanged(function (user) {
      resolve(user || null)
    })
  })
}
