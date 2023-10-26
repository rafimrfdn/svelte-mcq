<script>
  import { onMount } from 'svelte';

  let items = [];
  let currentQuestion = 0;
  let selectedOption = "";
  let isCorrect = false;
  let score = 0;
  let completed = false;
  let shuffledQuestions = [];
  
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
    }
  }

  function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    completed = false;
    selectedOption = "";
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

<main>
  {#if !completed}
    <div>
      <label for="name">Enter your name: </label>
      <input type="text" id="name" bind:value={playerName} />

    </div>
  {/if}

  {#if items.length > 0}
    {#if completed}
      <p>{playerName}, Quiz completed. Your score: {score} out of {shuffledQuestions.length}</p>
      <button on:click={restartQuiz}>Restart Quiz</button>
    {:else}
      <h1>{shuffledQuestions[currentQuestion].question_text}</h1>
      <ol>
        {#each [
          shuffledQuestions[currentQuestion].option_a,
          shuffledQuestions[currentQuestion].option_b,
          shuffledQuestions[currentQuestion].option_c,
          shuffledQuestions[currentQuestion].option_d
        ] as option}
          <label>
            <input type="radio" name="answer" bind:group={selectedOption} value={option} on:change={() => selectOption(option)} />
            {option}
          </label>
        {/each}
      </ol>
      {#if isCorrect}
        <p>Correct!</p>
      {/if}
      <button on:click={nextQuestion}>Next Question</button>
    {/if}
  {:else}
    <p>Loading questions...</p>
  {/if}
</main>
