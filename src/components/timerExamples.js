// Print out each number in items array with 1 second delay using promises
addItem = text => {
  // let div = window.document.createElement( 'div' )
  // div.innerHTML = text
  // window.document.body.appendChild( div )
  console.log(text)
}
addItem( 'Javascript Synchronous Loop' )
let items = [ 1, 2, 3, 4, 5, 6, 7, 8 ]

runLoop = async () => {
  for ( const item of items ) {
    await new Promise( resolve => setTimeout( resolve, 1000 ) )
    addItem( item )
  }
}

runLoop();