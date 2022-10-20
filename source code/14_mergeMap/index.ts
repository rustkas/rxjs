// https://stackblitz.com/

import { from, fromEvent, map, merge, mergeMap, Observable, timer } from 'rxjs';

interface Drink {
  name: string;
  country: string;
  price: number;
}
function getDrinks(): Observable<Observable<Drink>> {
  let beers = from([
    { name: 'Stella', country: 'Belgium', price: 9.5 },
    { name: 'Sam Adams', country: 'USA', price: 8.5 },
    { name: 'Bud Light', country: 'USA', price: 6.5 },
  ]);

  let softDrinks = from([
    { name: 'Coca Cola', country: 'USA', price: 1.5 },
    { name: 'Fanta', country: 'USA', price: 1.5 },
    { name: 'Lemonade', country: 'France', price: 6.5 },
  ]);

  return new Observable((observer) => {
    observer.next(beers);
    observer.next(softDrinks);
  });
}

const subscription1 = getDrinks()
  .pipe(mergeMap((drinks) => drinks))
  .subscribe({
    next: (drink) =>
      console.info(`Subscriber got ${drink.name}: ${drink.price}`),
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
