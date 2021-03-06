// Convert a string to spinal case. Spinal case is all-lowercase-words-joined-by-dashes

function spinalCase(str) {
  const l = str.length;
  let start, end, result = "";

  for (let i = 0; i < l; i++) {
    const integer = str.charCodeAt(i), letter = str[i];
    const upper = letter.toUpperCase(), lower = letter.toLowerCase();
    let result_, l_ = result.length - 1;

    if (i !== 0) {
      if (90 >= integer && integer >= 65) {
        if (letter === upper && result[l_] === '-') result += lower;
        else if (letter === upper) result += '-' + lower;
        else result += lower;
      }
      else if (122 >= integer && integer >= 97) result += letter;
      else result += '-';

    } else {
      if (90 >= integer && integer >= 65) result += letter.toLowerCase();
      else if (122 >= integer && integer >= 97) result += letter;
      else result += '-';
    }
  }

  return result;
}

const inputOne = "This Is Spinal Tap";
const inputTwo = "thisIsSpinalTap";
const inputThree = "The_Andy_Griffith_Show";
const inputFour = "Teletubbies say Eh-oh";
const inputFive = "AllThe-small Things"

console.log(spinalCase(inputOne));
console.log(spinalCase(inputTwo));
console.log(spinalCase(inputThree));
console.log(spinalCase(inputFour));
console.log(spinalCase(inputFive));
