const { useState } = React;
class TimerInstance {
    constructor(task, taskTime, breakTime, fruit) {
        this.task = task;
        this.taskTime = taskTime;
        this.breakTime = breakTime;
        this.fruit = fruit;
    }
}

const exampleTask = new TimerInstance('Example Task', 25, 5);
const taskArray = [];
taskArray.push(exampleTask);
function SettingPanel() {
    return (
        <div>
        <div className="fruit">
            Set your fruit:<br/>
            <select id="fruit">
                <option value="apple">Apple</option>
                <option value="banana">Banana</option>
                <option value="grapes">Grapes</option>
                <option value="kiwi">Kiwi</option>
                <option value="orange">Orange</option>
                <option value="pear">Pear</option>
                <option value="strawberry">Strawberry</option>
                <option value="watermelon">Watermelon</option>
            </select>
        </div>
		<div className="task">
			<label htmlFor="task">Set your task:</label>
			<input type="text" id="task" name="tname" ></input>
		</div>
        <div className="panel set-time">
			<div className="time">
				Set your timer:
				<select id="time" defaultValue={25}>
					<option value="5">5 minutes</option>
					<option value="10">10 minutes</option>
					<option value="15">15 minutes</option>
					<option value="20">20 minutes</option>
					<option value="25">25 minutes</option>
					<option value="30">30 minutes</option>
					<option value="35">35 minutes</option>
					<option value="40">40 minutes</option>
					<option value="45">45 minutes</option>
					<option value="50">50 minutes</option>
					<option value="55">55 minutes</option>
					<option value="60">60 minutes</option>
				</select>
			</div>
			<div className="break">
				Set your break:
				<select id="break">
					<option value="5">5 minutes</option>
					<option value="10">10 minutes</option>
					<option value="15">15 minutes</option>
					<option value="20">20 minutes</option>
					<option value="25">25 minutes</option>
					<option value="30">30 minutes</option>
					<option value="35">35 minutes</option>
					<option value="40">40 minutes</option>
					<option value="45">45 minutes</option>
					<option value="50">50 minutes</option>
					<option value="55">55 minutes</option>
					<option value="60">60 minutes</option>
				</select>
			</div>
        </div>
        <div>
            <button onClick={addCheck} id="save">Add</button>
		</div>
		</div>
	);
	
	function addCheck() {
		const fruit = document.getElementById('fruit').value;
		const task = document.getElementById('task').value;
		const taskTime = document.getElementById('time').value;
		const breakTime = document.getElementById('break').value;
		if (task === '') {
			alert('Please enter a task');
		} else {
			alert(`Task ${task} added`);
			const newTask = new TimerInstance(task, taskTime, breakTime);
			taskArray.push(newTask);
			document.getElementById('task').value = '';
			for (let i = 0; i < taskArray.length; i++) {
				console.log(taskArray[i]);
			}
		}
	}
}

function TaskBlock(instance) { 
    // We can change HTML for this
    return (
        <div className="TimerInstance">
            {instance.task} {instance.fruit}
            <br></br>
            {instance.taskTime} {instance.breakTime}
        </div>
    );
}

// Use to replace HTML
function Header() {
    return (
        <React.Fragment>
            <nav>
                <h1>Pomodoro Timer</h1>
                <ul>
                    <li><a href="index.html">Timer</a></li>
                    <li><a href="#records">Records</a></li>
                </ul>
            </nav>
        </React.Fragment>
    )
}

function Timer() {
    function validateMinute(input) {
        const minutePattern = /^([0-9]{1,2})$/;
        if (minutePattern.test(input) && input >= 0 && input <= 59) {
            return true;
        } else {
            return false;
        }
    }

    function validateSecond(input) {
        const secondPattern = /^([0-9]{1,2})$/;
        if (secondPattern.test(input) && input >= 0 && input <= 59) {
            return true;
        } else {
            return false;
        }
    }

    const [minute, setMinute] = useState(25);
    const [second, setSecond] = useState('00');

    const handleMinuteChange = (e) => {
        const value = e.target.value;
        if (validateMinute(value)) {
            setMinute(value);
        }
    };

    const handleSecondChange = (e) => {
        const value = e.target.value;
        if (validateSecond(value)) {
            setSecond(value);
        }
    };

    return (
        <div className="panel timer">
            <div className="time">
                <input 
                    type="text" 
                    id="minuteInput" 
                    value={minute} 
                    onClick={(e) => e.target.select()} 
                    onChange={handleMinuteChange} 
                    style={{ borderColor: validateMinute(minute) ? '' : 'red' }}
                /> 
                :
                <input 
                    type="text" 
                    id="secondInput" 
                    value={second} 
                    onClick={(e) => e.target.select()} 
                    onChange={handleSecondChange} 
                    style={{ borderColor: validateSecond(second) ? '' : 'red' }}
                />
            </div>
            <div className="buttons">
                <button id="start">Start</button>
                <button id="pause">Pause</button>
                <button id="reset">Reset</button>
            </div>
        </div>
    );
}

// Use to replace HTML
function Footer() {
    return (
        <footer>
            <p>Created by Aaron, Anthony, Jason, and Uranus</p>
        </footer>
    )
}

function App() {
    const [taskQueue, setTaskQueue] = useState([]);
    const [doneQueue, setDoneQueue] = useState([]);

    // Adds a task to the task queue on the left
    function addTask(instance){
        const temp = new TimerInstance("TEST", 25, 5, "APPLE")
        setTaskQueue([...taskQueue, temp])
    }

    // Removes the top task from the task queue and puts it in the finished queue
    function finishTask(){
        if(taskQueue.length < 1){
            console.log("taskQueue underflow!");
            return;
        }
        const finishedTask = taskQueue[0];
        taskQueue.shift(1);
        setDoneQueue([...doneQueue, finishedTask]);
    }

    // We can change HTML for this
    return (
        <React.Fragment>
            {/* <Header /> */}
            <SettingPanel />
            <div className="TaskQueue">
                {taskQueue.map((task, index) => (
                    <TaskBlock key={index} {...task} />
                ))}
            </div>
            <Timer />
            <div className="DoneQueue">
                {doneQueue.map((task, index) => (
                    <TaskBlock key={index} {...task} />
                ))}
            </div>
            {/* Just for testing, can remove */}
            <button onClick={addTask}>Add Task</button>
            <button onClick={finishTask}>Remove Top Task</button>
        </React.Fragment>
    );
}


ReactDOM.createRoot(document.getElementById("root")).render(<App />);