<script lang="ts">
  import ThemeSwitch from '$lib/ThemeSwitch/ThemeSwitch.svelte';
  import { onMount } from 'svelte';

  let items = [];
  let currentQuestion = 0;
  let selectedOption = "";
  let isCorrect = false;
  let score = 0;
  let completed = false;
  let shuffledQuestions = [];
  let showHint = false;

  let playerName = ""; // Added to store the user's name

  onMount(async () => {
    const response = await fetch('./api');
    items = await response.json();
    shuffledQuestions = shuffleArray(items);
  });

  function selectOption(option) {
    selectedOption = option;
    isCorrect = option === shuffledQuestions[currentQuestion].correct_answer;
  }

  function showExplanation() {
    showHint = true;
  }

  function nextQuestion() {
    if (isCorrect) {
      score++;
    }
    currentQuestion++;

    if (currentQuestion >= shuffledQuestions.length) {
      completed = true;
    } else {
      selectedOption = "";
      isCorrect = false;
      showHint = false; // Reset the hint display
    }
  }

  function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    completed = false;
    selectedOption = "";
    showHint = false;
    shuffledQuestions = shuffleArray(items);
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }



</script>

<div class="bg-neutral-100 bg-white dark:bg-black">

    <main class="py-0 min-h-screen w-full px-2" >
        <div class="flex justify-between flex-nowrap">
            <div class="mb-24 p-4 text-start ">
                <h1 class="font-bold text-xl">SoalCPNS.vercel.app</h1>
                <h2 >Kumpulan Latihan Soal CPNS HOTS terbaru</h2>
            </div>
            <ThemeSwitch />
        </div>

        <div class="flex flex-col text-center">
            <a class="mx-auto inline-block w-32 border p-4 mb-4 hover:bg-white hover:text-black" href="/twk">TWK</a>
            <a class="mx-auto inline-block w-32 border p-4 mb-4 hover:bg-white hover:text-black" href="/tiu">TIU</a>
            <a class="mx-auto inline-block w-32 border p-4 mb-4 hover:bg-white hover:text-black" href="/tkp">TKP</a>
        </div>

    </main>
</div>

<style>
* {
    font-family: 'Inter Tight', sans-serif;
}
</style>
