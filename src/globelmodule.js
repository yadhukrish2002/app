// Initialize the global variable with an initial value
let emailverified = false;
let phoneverified = false;
// Export a function to update the global variable
export function setemailGV(value) {
    emailverified = value;
}
export function setphoneGV(value) {
    phoneverified = value;
  }

// Export the global variable itself
export function getemailGV() {
  return emailverified;
}
export function getphoneGV() {
    return phoneverified;
  }