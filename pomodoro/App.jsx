const { useState } = React;
import SettingPanel from "./SettingPanel.js";
import TimerInstance from "./TimerInstance.js";
class TimerInstance {
    constructor(task, taskTime, breakTime, fruit) {
        this.task = task;
        this.taskTime = taskTime;
        this.breakTime = breakTime;
        this.fruit = fruit;
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
            <SettingPanel />
            <div className="TaskQueue">
                {taskQueue.map((task, index) => (
                    <TaskBlock key={index} {...task} />
                ))}
            </div>
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