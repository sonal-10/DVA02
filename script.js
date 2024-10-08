// Load the data.json file
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const flashcardsContainer = document.getElementById('flashcards');
    const questionsContainer = document.getElementById('questions');

    data.forEach(flashcard => {
      const flashcardName = Object.keys(flashcard)[0];
      const flashcardButton = document.createElement('button');
      flashcardButton.textContent = flashcardName;

      flashcardButton.addEventListener('click', () => {
        // Clear previous selections
        flashcardsContainer.querySelectorAll('button').forEach(button => button.classList.remove('selected'));
        flashcardButton.classList.add('selected');
        
        // Load questions for the selected flashcard
        loadQuestions(flashcard[flashcardName]);
      });

      flashcardsContainer.appendChild(flashcardButton);
    });

    function loadQuestions(questions) {
      questionsContainer.innerHTML = ''; // Clear previous questions
      questions.forEach(question => {
        const questionElement = document.createElement('div');
        questionElement.textContent = question.question;
        questionsContainer.appendChild(questionElement);

        question.options.forEach((option, index) => {
          const optionButton = document.createElement('button');
          optionButton.textContent = option;
          
          optionButton.addEventListener('click', () => {
            // Check if the answer is correct
            optionButton.classList.add(question.correct_answer.includes(index) ? 'correct' : 'incorrect');
          });

          questionsContainer.appendChild(optionButton);
        });
      });
    }
  })
  .catch(error => console.error('Error loading data:', error));
