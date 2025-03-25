// Desc: SettingPanel component
import TimerInstance from './TimerInstance.js';
const exampleTask = new TimerInstance('Example Task', 25, 5);
const taskArray = [];
taskArray.push(exampleTask);
function SettingPanel() {
    return (
        <>
        <div className="fruit">
            <div className="orange-font">Set your fruit:<br/> </div>
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
			<label htmlFor="task" className="orange-font">Set your task:<br/></label>
			<input type="text" id="task" name="tname" ></input>
		</div>
        <div className="set-time">
			<div className="time">
            	<div className="orange-font">Set your timer:<br/> </div>
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
            	<div className="orange-font">Set your break:<br/> </div>
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
		</>
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

export default SettingPanel;