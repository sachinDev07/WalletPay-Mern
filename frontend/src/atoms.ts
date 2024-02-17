import { atom } from "recoil";

export const profileAtom = atom({
  key: "profile",
  default: localStorage.getItem("usernameFirstLetter") || "Z",
});
