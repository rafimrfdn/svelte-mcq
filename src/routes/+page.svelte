<script lang="ts">
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

    <div class="mb-4 bg-white p-4 md:text-start text-center">
    <h1 class="font-bold text-xl">SoalCPNS.vercel.app</h1>
    <h2 >Kumpulan Latihan Soal CPNS HOTS terbaru</h2>
        </div>
<main class="md:py-24 py-0 h-screen w-full px-2" >
    <div class=" mx-auto justify-center md:w-1/2 w-full">
  {#if !completed}
    <div class="bg-red">
      <label class="mr-4" for="name">Enter your name: </label>
      <input class="border p-4 my-2" type="text" id="name" bind:value={playerName} />
    </div>
  {/if}

  {#if items.length > 0}
    {#if completed}
      <p>{playerName}, Quiz completed. Your score: {score} out of {shuffledQuestions.length}</p>
      <button class="bg-green-100 p-4 my-4" on:click={restartQuiz}>Restart Quiz</button>
    {:else}
      <h2 class="font-bold text-2xl my-10">{shuffledQuestions[currentQuestion].question_text}</h2>
      <ul class="my-4">
        {#each [
          shuffledQuestions[currentQuestion].option_a,
          shuffledQuestions[currentQuestion].option_b,
          shuffledQuestions[currentQuestion].option_c,
          shuffledQuestions[currentQuestion].option_d,
          shuffledQuestions[currentQuestion].option_e
        ] as option}
          <li >
            <label>
              <input type="radio" name="answer" bind:group={selectedOption} value={option} on:change={() => selectOption(option)} />
              {option}
            </label>
          </li>
        {/each}
      </ul>
      {#if isCorrect}
        <p class="my-4 font-bold">Correct!</p>
        <button class="bg-yellow-200 p-4" on:click={showExplanation}>Show Explanation</button>
        {#if showHint}
          <div class="bg-red-100 p-4 my-2">
            <p >{shuffledQuestions[currentQuestion].hint}</p>
          </div>
        {/if}
      {/if}

      <button class="bg-blue-200 p-4" on:click={nextQuestion}>Next Question</button>
    {/if}
  {:else}
    <p>Loading questions...</p>
  {/if}
            </div>
</main>

<style>
* {
    font-family: 'Inter Tight', sans-serif;
}
</style>
