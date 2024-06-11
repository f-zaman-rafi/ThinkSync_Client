import moment from 'moment';

const ModalTest = () => {
    // Get today's date
    const today = moment();

    // Specify the end date for comparison
    const endDate = moment('2024-06-15'); // Change this to your desired end date

    // Compare today's date with the end date
    const isOver = today.isAfter(endDate);

    return (
        <div>
            {isOver ? (
                <button>Over</button>
            ) : (
                <button>Going on...</button>
            )}
        </div>
    );
};

export default ModalTest;
