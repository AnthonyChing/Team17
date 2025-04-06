from django.db import models

# Create your models here.
class Record(models.Model):
	task = models.TextField()
	taskTime = models.DurationField()
	breakTime = models.DurationField()

	def __str__(self):
		return self.task