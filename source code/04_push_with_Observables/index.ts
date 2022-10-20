// https://stackblitz.com/

import { from, fromEvent, Observable, Observer, of, scheduled } from 'rxjs';

let beers = [
  { name: 'Stella', country: 'Belgium', price: 9.5 },
  { name: 'Sam Adams', country: 'USA', price: 8.5 },
  { name: 'Bud Light', country: 'USA', price: 6.5 },
  { name: 'Brooklyn Lager', country: 'USA', price: 8.0 },
  { name: 'Sapporo', country: 'Japan', price: 7.5 },
];

from(beers).subscribe({
  next: (beer) => console.log(beer),
  error: (err) => console.error(err),
  complete: () => console.log('Streaming is over'),
});

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
