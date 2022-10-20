// https://stackblitz.com/

import { from, fromEvent, Observable, reduce, map, catchError } from 'rxjs';

interface Beer {
  name: string;
  country: string;
  price: number;
}

function emulateDelayInSeconds(seconds: number) {
  const e = new Date().getTime() + seconds * 1000;
  while (new Date().getTime() <= e) {} // just to keep the CPU busy
}

function getData() {
  const beers: Beer[] = [
    { name: 'Stella', country: 'Belgium', price: 9.5 },
    { name: 'Sam Adams', country: 'USA', price: 8.5 },
    { name: 'Bud Light', country: 'USA', price: 6.5 },
    { name: 'Brooklyn Lager', country: 'USA', price: 8.0 },
    { name: 'Sapporo', country: 'Japan', price: 7.5 },
  ];

  return new Observable((observer) => {
    let counter = 0;
    beers.forEach((beer) => {
      observer.next(beer);
      counter++;

      if (counter > Math.random() * 5) {
        // Randomly generate an error
        observer.error({
          status: 500,
          description: 'Beer stream error',
        });
      } else {
        emulateDelayInSeconds(1);
      }
    });

    observer.complete();
  });
}

function getCachedData() {
  const beers: Beer[] = [
    { name: 'Leffe Blonde', country: 'Belgium', price: 9.5 },
    { name: 'Miller Lite', country: 'USA', price: 8.5 },
    { name: 'Corona', country: 'Mexico', price: 8.0 },
    { name: 'Asahi', country: 'Japan', price: 7.5 },
  ];

  return new Observable((observer) => {
    beers.forEach((beer) => {
      observer.next(beer);
      emulateDelayInSeconds(1);
    });
    observer.complete();
  });
}

function getDataFromAnotherService() {
  const beers: Beer[] = [
    { name: 'Peroni', country: 'Italy', price: 9.5 },
    { name: 'Heineken', country: 'Holland', price: 8.5 },
    { name: 'Beck', country: 'Germany', price: 8.0 },
    { name: 'Kingfisher', country: 'India', price: 7.5 },
  ];

  return new Observable((observer) => {
    beers.forEach((beer) => {
      observer.next(beer);
      emulateDelayInSeconds(1);
    });

    observer.complete();
  });
}

// Subscribing to data from the primary source
const subscription1 = getData()
  .pipe(
    catchError((err) => {
      // failover
      console.error(`Got ${err.status}: ${err.description}`);
      if (err.status === 500) {
        console.error('>>> Switching to retrieving cached data');
        return getCachedData();
      } else {
        console.error('>>>>> Switching to another data source');
        return getDataFromAnotherService();
      }
    }),
    map<Beer, string>((beer) => `${beer.name}, ${beer.country}`)
  )
  .subscribe({
    next: (beer) => console.log(`Subscriber got ${beer}`),
    error: (err) => console.error(err),
    complete: () => console.log('The stream is over'),
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
