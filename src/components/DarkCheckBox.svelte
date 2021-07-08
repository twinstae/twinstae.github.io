<script>
  import { onMount } from "svelte";

  let is_dark = false;

  function on_dark_change(){
    localStorage.setItem("dark", is_dark);
    document.getElementsByTagName("html")[0].className = is_dark ? "dark" : "light";
  }

  onMount(()=>{
    is_dark = document.getElementsByTagName("html")[0].className == "dark";
  })
</script>

<input type="checkbox" id="darkmode-checkbox" bind:checked={is_dark} on:change={on_dark_change}>
<label for="darkmode-checkbox">
  <span></span>
  <span></span>
</label>

<style>
label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
}

span:last-child {
  position: relative;
  width: 50px;
  height: 26px;
  border-radius: 15px;
  border: 2px solid gray;
  background: var(--white);
  transition: all 0.3s;
}

span:last-child::before,
span:last-child::after {
  content: "";
  position: absolute;
}

span:last-child::before {
  left: -1px;
  top: -1px;
  width: 24px;
  height: 24px;
  background: var(--white);
  border: 2px solid gray;
  border-radius: 50%;
  z-index: 1;
  transition: transform 0.3s;
}

span:last-child::after {
  top: 0.5rem;
  right: 0.7rem;
  width: 12px;
  height: 12px;
  transform: translateY(-50%);
  content: "🌞";
}

[type="checkbox"] {
  position: absolute;
  left: -9999px;
}

[type="checkbox"]:checked + label span:last-child {
  background: var(--black);
}

[type="checkbox"]:checked + label span:last-child::before {
  transform: translateX(24px);
}

[type="checkbox"]:checked + label span:last-child::after {
  width: 14px;
  height: 14px;
  /*right: auto;*/
  left: 0.2rem;
  top: 3px;
  content: "🌜";
  transform: scale(.8);
}
</style>


