const { useState } = React;
class TimerInstance {
    constructor(task, taskTime, breakTime, fruit) {
        this.task = task;
        this.taskTime = taskTime;
        this.breakTime = breakTime;
        this.fruit = fruit;
    }
}

function SettingPanel(props) {
    return (
        <div>
        <div className="taskContainer">
            <div className="fruit">
                <pre className="orange-font">   Fruit options   </pre>
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
		    <div className="task orange-font">
			    <label htmlFor="task" ><pre>   Task name   </pre></label>
			    <input type="text" id="task" name="tname" ></input>
		    </div>
        </div>
        <br/>
        <div className="taskContainer">
            <div className="orange-font">
                <pre>   WorkTime   <br/></pre>
				<select id="time" defaultValue={25}>
					<option value="1">1 minute</option>
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
            <div className="orange-font">
                <pre>   BreakTime   <br/></pre>
				<select id="break">
					<option value="1">1 minute</option>
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
        <br/>
        <div className="taskContainer">
            <div></div>
            <div className="buttons">
                <button onClick={addCheck} id="save">Add Task</button>
		    </div>
            <div></div>
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
            props.addTask(newTask);
			document.getElementById('task').value = '';
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

function Timer(props) {
    const [time, setTime] = useState({ minute: 25, second: 0 });
    const [isRunning, setIsRunning] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const [currentTask, setCurrentTask] = useState(null);
    const [currentTimerType, setCurrentTimerType] = useState("task"); // "task" or "break"
    const [showTaskInfo, setShowTaskInfo] = useState(false);

    const startTimer = (type = "task") => {
        setCurrentTimerType(type);
        if (!isRunning) {
            setIsRunning(true);
            const id = setInterval(() => {
                setTime((prevTime) => {
                    const { minute, second } = prevTime;
                    if (minute === 0 && second === 0) {
                        clearInterval(id);
                        playAlarm();
                        showNotification(type);
                        return { minute: 0, second: 0 }; // Ensure timer stops at 0
                    }
                    if (second === 0) {
                        return { minute: minute - 1, second: 59 };
                    }
                    return { minute, second: second - 1 };
                });
            }, 1000);
            setIntervalId(id);
        }
    };

    const pauseTimer = () => {
        setIsRunning(false);
        clearInterval(intervalId);
    };

    const nextTask = () => {
        setIsRunning(false);
        clearInterval(intervalId);

        const task = props.popTask();
        if (!task) {
            const notification = document.createElement('div');
            notification.innerHTML = `
                <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 20px; border: 1px solid black; z-index: 1000;">
                    <p>Please add a task first!</p>
                    <button id="gotItButton">Got it</button>
                </div>
            `;
            document.body.appendChild(notification);

            document.getElementById('gotItButton').addEventListener('click', () => {
                document.body.removeChild(notification);
            });
            return;
        }

        setCurrentTask(task);
        setTime({ minute: task.taskTime, second: 0 });
        setShowTaskInfo(true); // Show task info after the first click
    };

    const playAlarm = () => {
        const audio = new Audio('/static/mp3/alarm.mp3'); // Update the path to include /static
        audio.loop = true;
        audio.play();
        window.alarmAudio = audio; // Store reference to stop later
    };

    const stopAlarm = () => {
        if (window.alarmAudio) {
            window.alarmAudio.pause();
            window.alarmAudio.currentTime = 0;
        }
    };

    const showNotification = (type) => {
        const notification = document.createElement('div');
        notification.innerHTML = `
            <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 20px; border: 1px solid black; z-index: 1000;">
                <p>${type === "task" ? "Task time is up!" : "Break time is up!"}</p>
                <button id="gotItButton">Got it</button>
            </div>
        `;
        document.body.appendChild(notification);

        document.getElementById('gotItButton').addEventListener('click', () => {
            stopAlarm();
            document.body.removeChild(notification);

            if (type === "task") {
                // Start break timer
                setTime({ minute: currentTask.breakTime, second: 0 });
                startTimer("break");
            } else if (type === "break") {
                // Add finished task to DoneQueue
                if (currentTask) {
                    props.addFinishedTask(currentTask);
                    setCurrentTask(null);
                }
            }
        });
    };

    return (
        <div className="">
            <div className="time">
                <input 
                    type="number" 
                    id="minuteInput"
                    className="timeInput"
                    value={time.minute} 
                    onClick={(e) => e.target.select()} 
                    onChange={(e) => setTime({ ...time, minute: parseInt(e.target.value) || 0 })} 
                    style={{ borderColor: time.minute >= 0 && time.minute <= 59 ? '' : 'red' }}
                /> 
                :
                <input 
                    type="number" 
                    id="secondInput" 
                    className="timeInput"
                    value={time.second} 
                    onClick={(e) => e.target.select()} 
                    onChange={(e) => setTime({ ...time, second: parseInt(e.target.value) || 0 })} 
                    style={{ borderColor: time.second >= 0 && time.second <= 59 ? '' : 'red' }}
                />
            <div className="buttons">
                <button id="start" onClick={() => startTimer("task")}>Start</button>
                <button id="pause" onClick={pauseTimer}>Pause</button>
                <button id="next" onClick={nextTask}>Next</button>
            </div>
            </div>
            {currentTask && (
                <h3 style={{ display: showTaskInfo ? "block" : "none" }}>
                    {currentTimerType === "task"
                        ? `Currently working on task: ${currentTask.task}, focusing ${currentTask.taskTime} minutes with break time ${currentTask.breakTime} minutes`
                        : `Currently taking a break after task: ${currentTask.task}, focusing ${currentTask.taskTime} minutes with break time ${currentTask.breakTime} minutes`}
                </h3>
            )}

        </div>
    );
}

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

    function addTask(instance) {
        setTaskQueue([...taskQueue, instance]);
    }

    function popTask() {
        if (taskQueue.length < 1) {
            console.log("taskQueue underflow!");
            return null;
        }
        const task = taskQueue[0];
        const newQueue = taskQueue.slice(1);
        setTaskQueue(newQueue);
        return task;
    }

    function addFinishedTask(instance) {
        setDoneQueue([...doneQueue, instance]);
    
        // Send POST request to Django backend
        fetch("/add_finished_task/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                task: instance.task,
                taskTime: instance.taskTime,
                breakTime: instance.breakTime,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to save task to the database");
                }
                return response.json();
            })
            .then((data) => {
                console.log(data.message);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    return (
        <React.Fragment>
            <nav>
                <h1>Pomodoro Timer</h1>
            </nav>
            <div className="container">
                <div className="panel queueWidth">
                    <div className="TaskQueue">
                        <h2 className="black-topic">Task Queue</h2>
                        {taskQueue.map((task, index) => (
                            <TaskBlock key={index} {...task} />
                        ))}
                    </div>
                </div>
                <div className="middleContainer">
                    <div className="panel middleWidth">
                        <h2 className="black-topic">Timer</h2>
                        <Timer popTask={popTask} addFinishedTask={addFinishedTask} />
                    </div>
                    <br/>
                    <div className="panel middleWidth">
                        <h2 className="black-topic">Task Settings</h2>
                        <SettingPanel addTask={addTask} />
                    </div>
                </div>
                <div className="panel queueWidth">
                    <h2 className="black-topic">Task Records</h2>
                    <div className="DoneQueue">
                        {doneQueue.map((task, index) => (
                            <TaskBlock key={index} {...task} />
                        ))}
                    </div>
                </div>
            </div>
            <Footer/>
        </React.Fragment>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);