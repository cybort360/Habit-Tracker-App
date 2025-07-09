'use strict';

const habitTracker = {
  habits: [],

  addHabit() {
    const habitName = prompt('Register new habit');
    if (!habitName || habitName.trim() === '') {
      console.log('Field cannot be empty');
      return;
    }

    const habit = habitName[0].toUpperCase() + habitName.slice(1).toLowerCase();
    const habitObj = { name: habit, completed: 0, status: false };
    this.habits.push(habitObj);
    console.log(this.habits);
  },

  viewHabits() {
    if (this.habits.length === 0) {
      console.log('Tracker empty');
      return;
    }

    for (const [index, habit] of this.habits.entries()) {
      const status = habit.status ? '✅ Completed' : '❌ Pending';
      console.log(`${index + 1} : Habit - ${habit.name} | Times completed - ${habit.completed} | Status - ${status}`);
    }
  },

  markAsCompleted() {
    if (this.habits.length === 0) {
      console.log('Tracker empty');
      return;
    }

    const askHabitToComplete = prompt('Which habit are you checking in?');
    if (!askHabitToComplete || askHabitToComplete.trim() === '') {
      console.log('Field cannot be empty');
      return;
    }

    const toComplete = askHabitToComplete[0].toUpperCase() + askHabitToComplete.slice(1).toLowerCase();
    let isComplete = false;

    for (const habit of this.habits) {
      if (habit.name.toLowerCase() === toComplete.toLowerCase()) {
        isComplete = true;
        habit.completed++;
        habit.status = true;

        console.log(`✅ ${habit.name} completed ${habit.completed} times`);
        break;
      }
    }

    if (!isComplete) {
      console.log('Habit not found');
    }
  },

  deleteHabit() {
    if (this.habits.length === 0) {
      console.log('Tracker empty');
      return;
    }

    const habitToDelete = prompt('Which habit are you deleting');
    if (!habitToDelete || habitToDelete.trim() === '') {
      console.log('Field cannnot be empty');
      return;
    }

    const toDelete = habitToDelete[0].toUpperCase() + habitToDelete.slice(1).toLowerCase();
    let index = -1;

    for (let i = 0; i < this.habits.length; i++) {
      if (this.habits[i].name === toDelete) {
        index = i;
        break;
      }
    }

    if (index !== -1) {
      const confirmDelete = confirm(`Are you sure you want to delete ${this.habits[index].name}?`);
      if (confirmDelete) {
        this.habits.splice(index, 1);
        console.log(`${toDelete} removed from tracker`);
      } else {
        console.log('Action cancelled');
      }
    } else {
      console.log('Habit not found');
    }
  },

  reset() {
    if (this.habits.length === 0) {
      console.log('Tracker empty');
      return;
    }

    const confirmReset = confirm('Are you sure you want to reset tracker?');
    if (confirmReset) {
      this.habits = [];
      console.log('Tracker reset');
    } else {
      console.log('Action cancelled');
    }
  },
};

document.querySelector('.add-habit').addEventListener('click', habitTracker.addHabit.bind(habitTracker));
document.querySelector('.view-habits').addEventListener('click', habitTracker.viewHabits.bind(habitTracker));
document.querySelector('.mark-completed').addEventListener('click', habitTracker.markAsCompleted.bind(habitTracker));
document.querySelector('.delete-habit').addEventListener('click', habitTracker.deleteHabit.bind(habitTracker));
document.querySelector('.reset-habits').addEventListener('click', habitTracker.reset.bind(habitTracker));
