

const VoteForm = ({ answers = ['default 1', 'default 2', 'default 3'] }) => {

  const handleVote = async (e) => {
    e.preventDefault()
  }

  return (
    <div>
      <form onSubmit={handleVote}>
        {answers.map(answer => (
          <div>
            <input
              type="radio"
              id={`answer${answers.id}`}
              value={answer.answer}
            />
            {answer.answer}
          </div>
        ))}
        <button>Vote</button>
      </form>
    </div>
  );
}
export default VoteForm;