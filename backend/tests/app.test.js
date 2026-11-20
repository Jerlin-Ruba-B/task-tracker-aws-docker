
const request = require('supertest');
const app = require('../app');
const Task = require('../models/Task');

describe('Task Tracker API', () => {

  test('GET / should return API running message', async () => {
    const response = await request(app).get('/');

    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Task Tracker API is running!');
  });

  test('POST /api/tasks should create a task', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .send({
        title: 'Learn Jenkins',
        description: 'Practice CI/CD',
        completed: false
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe('Learn Jenkins');
  });

  test('GET /api/tasks should return all tasks', async () => {
    await Task.create({ title: 'Learn Docker' });

    const response = await request(app).get('/api/tasks');

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
  });

  test('GET /api/tasks/:id should return one task', async () => {
    const task = await Task.create({ title: 'Learn AWS' });

    const response = await request(app)
      .get(`/api/tasks/${task._id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe('Learn AWS');
  });

  test('PATCH /api/tasks/:id should update a task', async () => {
    const task = await Task.create({ title: 'Learn Git' });

    const response = await request(app)
      .patch(`/api/tasks/${task._id}`)
      .send({ completed: true });

    expect(response.statusCode).toBe(200);
    expect(response.body.completed).toBe(true);
  });

  test('DELETE /api/tasks/:id should delete a task', async () => {
    const task = await Task.create({ title: 'Learn Linux' });

    const response = await request(app)
      .delete(`/api/tasks/${task._id}`);

    expect(response.statusCode).toBe(200);

    const deletedTask = await Task.findById(task._id);
    expect(deletedTask).toBeNull();
  });

});
