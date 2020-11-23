function expo2(amount: number) {
  return amount ** 2;
}
console.log(expo2(1000));
// console.log(expo2('1000')); // error

function taxed(amount: number): number {
  return amount * 1.1;
}
// function taxed2(amount: number): number {
//   return `${amount * 1.1}`; // error
// }
