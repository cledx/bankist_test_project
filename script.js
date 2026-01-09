'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Comment Git Test
// Git Branch Testing

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
const currencies = new Map([
  ['USD', { name: 'United States dollar', symbol: '$' }],
  ['EUR', { name: 'Euro', symbol: '€' }],
  ['GBP', { name: 'Pound sterling', symbol: '£' }],
]);
const currentCurrency = 'EUR'

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accountTest = {
  owner: 'Test Account',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2,
  pin: 1234,
};
const accounts = [account1, account2, account3, account4, accountTest];

function generateUsername(accs) {
  accs.forEach(acc => acc.username = acc.owner.toLowerCase().split(' ').map(name => name[0]).join(''));

}
generateUsername(accounts);

// function generateBalance(accs) {
//   accs.forEach(acc => acc.balance = acc.movements.reduce((acc, cur) => acc + cur, 0));
// }
// generateBalance(accounts);
// console.log(accounts);

// const displayBalance = function (acc) {
//   labelBalance.textContent = acc.balance;
// }

// displayBalance(accounts[0]);
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];



// console.log(accounts);
// `${name.split(' ')[0].at(0).toLowerCase()}.${name.split(' ').at(-1).toLowerCase()}`


// console.log(...accounts);
// for (const acc of accounts) acc.username = generateUsername(acc.owner);
// console.log(...accounts);

// const usernames = accounts.map(acc => `${acc.owner.split(' ')[0].at(0).toLowerCase()}.${acc.owner.split(' ').at(-1).toLowerCase()}`);

// console.log(usernames);


//   const names = acc.owner.split(' ');
//   return names
//   console.log(names);




const updateUI = function (acc, sort) {

  const balance = acc.movements.reduce((acc, mov) => acc + mov, 0);


  const calcPrintBalance = function () {
    // console.log(`Balance is: ${balance}`);
    labelBalance.textContent = `${balance} ${currencies.get(currentCurrency).symbol}`;
  }

  const displayMovements = function (movements) {
    containerMovements.innerHTML = '';
    movements.forEach(function (mov, i) {

      const type = mov > 0 ? 'deposit' : 'withdrawal';

      const html = `
          <div class="movements__row">
            <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
            <div class="movements__date">N/A</div>
            <div class="movements__value">${mov} ${currencies.get(currentCurrency).symbol}</div>
          </div>
        `;
      containerMovements.insertAdjacentHTML('afterbegin', html);
    });

  }

  const displayIn = (movements => labelSumIn.textContent = `${movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0)}
    ${currencies.get(currentCurrency).symbol}`
  );

  const displayOut = (movements => labelSumOut.textContent = `${Math.abs(movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0))}
    ${currencies.get(currentCurrency).symbol}`
  );
  const displayInterest = (movements => labelSumInterest.textContent = `${movements
    .filter(mov => mov > 0)
    .map(deposit => deposit * (acc.interestRate / 100))
    .filter(interest => interest >= 1)
    .reduce((acc, int) => acc + int, 0)}
    ${currencies.get(currentCurrency).symbol} `
  );

  calcPrintBalance();
  sort == 'type' ? displayMovements(acc.movements.toSorted((a, b) => a - b)) : displayMovements(acc.movements);
  displayIn(acc.movements);
  displayOut(acc.movements);
  displayInterest(acc.movements);
}

updateUI(accountTest);



const eurToUsd = 1.1;

const deposits = movements.filter(mov => mov > 0);
const withdrawls = movements.filter(mov => mov < 0);
const depositsUSDTotal = deposits.map(mov => mov * eurToUsd).reduce((acc, mov) => acc + mov, 0);

// console.log(deposits);
// console.log(withdrawls);
// console.log(deposits.reduce((acc, mov) => acc + mov, 0));
// console.log(depositsUSDTotal);


/*
// Maximum value
// Can be used to reduce to one number, doesn't need to be the collected sum
// const maxVal = function (movements) {
//   return movements.reduce((acc, cur) => acc < cur ? cur : acc);
// }
// console.log(movements);
// console.log(maxVal(movements));
// console.log(deposits);
// console.log(withdrawls);

// console.log(movements);
// accumulator -> snowball

// acc = accumulator (snowball)
// curr = current value (the current value being processed of the array)
// i = index (index of cur in the array)
// arr = array (the original array in its totality)
// const balance = movements.reduce(function (acc, cur, i, arr) {
//   console.log(`Iteration ${ i }: ${ acc } `);
//   return acc + cur
// }, 0)
// console.log(balance);
// const balance = movements.reduce(((acc, cur) => acc + cur), 0);
// console.log(balance);

/*
// const movementsUSD = movements.map(function (mov) {
//   return mov * eurToUsd;
// })
// The above and below work identically. One uses arrow functions in order to be more clear and consise.
const movementsUSD = movements.map(mov => mov * eurToUsd);

// console.log(movements);
// console.log(movementsUSD);
//Does the same as above but uses for...of
// const movementsUSDfor = [];
// for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
// console.log(movementsUSDfor);

//displayMovements(account2.movements);
const movementsDescriptions = movements.map((mov, i, arr) => `Movement ${ i + 1 }: You ${ mov > 0 ? 'deposited' : 'withdrew' } ${ Math.abs(mov) } `);

console.log(movementsDescriptions);*/


/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES


// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

/* let arr = ['a', 'b', 'c', 'd', 'e'];

// Slice - Does NOT change original array
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));

// Splice - DOES change original array
// console.log(arr.splice(2));
arr.splice(-1);
console.log(arr);

// Reverse - DOES change original array
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2);

// Concat - Does NOT change original array
const letters = arr.concat(arr2);
console.log(letters);
console.log(...arr, ...arr2);

// Join
console.log(letters.join(' - '));
console.log(letters); */

/* const arr = [23, 11, 64];
console.log(arr[0]);
console.log(arr.at(0));

// can be used to get last array element as well
console.log(arr.at(-1)); */



/* // for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
  movement > 0
    ? console.log(`Movement ${ i + 1 }: You deposited ${ movement } `)
    : console.log(`Movement ${ i + 1 }: You withdrew ${ Math.abs(movement) } `);
}

movements.forEach(function (movement, index, wholeArray) {
  movement > 0
    ? console.log(`Movement ${ index + 1 }:You deposited ${ movement } `)
    : console.log(`Movement ${ index + 1 }:You withdrew ${ Math.abs(movement) } `);
}); */

/* const currencies = new Map([
  ['USD', 'United States Dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound Sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${ key }: ${ value } `);
});

// Set

const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);

currenciesUnique.forEach(function (value, _, map) {
  // _ indicates a throwaway variable that will not be used. This is convention and not a set in stone rule
  console.log(`${ value }: ${ value } `);
});
 */
