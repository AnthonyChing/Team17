from django.shortcuts import render
from django.http import HttpResponse
from django.template.loader import get_template
from .models import Record
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from datetime import timedelta

# Create your views here.
def homepage(request):
    records = Record.objects.all()
    template = get_template('index.html')
    html = template.render(locals())
    return HttpResponse(html)

@csrf_exempt
def add_finished_task(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            print("Received data:", data)  # Log the received data
            task = data.get("task")
            task_time = data.get("taskTime")
            break_time = data.get("breakTime")

            # Convert taskTime and breakTime to timedelta
            task_time = parse_duration(task_time)
            break_time = parse_duration(break_time)
            print("Parsed taskTime:", task_time)  # Log the parsed task time
            print("Parsed breakTime:", break_time)  # Log the parsed break time

            # Save the task to the database
            Record.objects.create(
                task=task,
                taskTime=task_time,
                breakTime=break_time,
            )

            return JsonResponse({"message": "Task added successfully!"}, status=201)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    return JsonResponse({"error": "Invalid request method"}, status=405)

def parse_duration(minutes_str):
    """Parses a duration string (e.g., '00:20:00') into a timedelta object."""
    try:
        return timedelta(hours=int(minutes_str)//60, minutes=int(minutes_str)%60, seconds=0)
    except ValueError:
        raise ValueError(f"Invalid duration format: {minutes_str}")


@csrf_exempt
def get_finished_tasks(request):
    if request.method == "GET":
        try:
            tasks = Record.objects.all()
            tasks_list = []
            for tasks in tasks:
                tasks_list.append({
                    "id": str(tasks.id),
                    "task": tasks.task,
                    "taskTime": str(tasks.taskTime),
                    "breakTime": str(tasks.breakTime),
                })

            return JsonResponse({"tasks": tasks_list}, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    return JsonResponse({"error": "Invalid request method"}, status=405)


@csrf_exempt
def delete_finished_task(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            print("Received data:", data)  # Log the received data
            task_id = data.get("id")
            Record.objects.filter(id=task_id).delete()
            print("Deleted task with ID:", task_id)  # Log the deleted task ID

            return JsonResponse({"message": "Task deleted successfully!"}, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    return JsonResponse({"error": "Invalid request method"}, status=405)