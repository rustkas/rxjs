// https://stackblitz.com/

import { from, fromEvent, filter, map } from 'rxjs';

interface Beer {
  name: string;
  country: string;
  price: number;
}

const beers: Beer[] = [
  { name: 'Stella', country: 'Belgium', price: 9.5 },
  { name: 'Sam Adams', country: 'USA', price: 8.5 },
  { name: 'Bud Light', country: 'USA', price: 6.5 },
  { name: 'Brooklyn Lager', country: 'USA', price: 8.0 },
  { name: 'Sapporo', country: 'Japan', price: 7.5 },
];

const observableBeers = from(beers).pipe(
  filter((beer) => beer.price < 8),
  map((beer) => `${beer.name}: $${beer.price}`)
);
const subscription1 = observableBeers.subscribe({
  next: (beer) => console.log(beer),
  error: (err) => console.error(err),
  complete: () => console.log('Streaming is over'),
});

// Stop stream

const stopSteamsBtn = document.getElementById('stopStreams');
if (stopSteamsBtn) {
  const stop_stream$ = fromEvent(stopSteamsBtn, 'click');
  const stop_stream_subscription = stop_stream$.subscribe((_element) => {
    subscription1.closed ? true : subscription1.unsubscribe();
    // subscription2.closed ? true : subscription2.unsubscribe();
    stop_stream_subscription.unsubscribe();
    // console.clear();
  });
}
