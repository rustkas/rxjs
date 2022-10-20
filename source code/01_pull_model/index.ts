// https://stackblitz.com/

import { from, fromEvent, Observable, Observer, of, scheduled } from 'rxjs';


let beers = [
  {name: "Stella", country: "Belgium", price: 9.50},
  {name: "Sam Adams", country: "USA", price: 8.50},
  {name: "Bud Light", country: "USA", price: 6.50},
  {name: "Brooklyn Lager", country: "USA", price: 8.00},
  {name: "Sapporo", country: "Japan", price: 7.50}
];

beers
  .filter(beer => beer.price < 8)
  .map(beer => beer.name + ": $" + beer.price)
  .forEach(result => console.log(result));
// Stop stream

const stopSteamsBtn = document.getElementById('stopStreams');
if (stopSteamsBtn) {
  const stop_stream$ = fromEvent(stopSteamsBtn, 'click');
  const stop_stream_subscription = stop_stream$.subscribe((_element) => {
    // subscription1.closed ? true : subscription1.unsubscribe();
    // subscription2.closed ? true : subscription2.unsubscribe();
    stop_stream_subscription.unsubscribe();
    // console.clear();
  });
}
