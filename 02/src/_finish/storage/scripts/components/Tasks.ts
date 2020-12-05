import { Storage } from '../functions';

type task = {
  id: string,
  title: string,
  description: string,
  done: boolean,
};

export class Tasks {
  tasks;
  storage: Storage;
  storageKey: string;
  constructor(storageKey: string) {
    this.storage = new Storage();
    this.storageKey = storageKey;
    this.tasks = {};
  }
  /**
   * ストレージからタスクを読み込み
   */
  getStorageTasks() {
    const tasks = this.storage.get(this.storageKey);
    this.tasks = tasks || {};
  }
  /**
   * ストレージにタスクを書き込み
   */
  setStorageTasks() {
    this.storage.set(this.storageKey, this.tasks);
  }
  /**
   * 全タスクを読み込み
   * @return 全タスクデータ
   */
  getTaskAll() {
    return this.tasks;
  }
  /**
   * タスクを読み込み
   * @param id タスクID
   * @return タスクデータ
   */
  getTask(id: string) {
    return this.tasks[id];
  }
  /**
   * タスクを追加
   * @param task タスクオブジェクト
   */
  addTask(task: task) {
    this.tasks[task.id] = task;
    this.setStorageTasks();
  }
  /**
   * タスクを削除
   * @param id タスクID
   */
  removeTask(id: string) {
    delete this.tasks[id];
    this.setStorageTasks();
  }
  /**
   * タスクを更新
   * @param id タスクID
   * @param title タイトル
   * @param description 内容
   */
  updateTask(id: string, title: string, description: string) {
    this.tasks[id].title = title;
    this.tasks[id].description = description;
    this.setStorageTasks();
  }
  /**
   * 完了ステータスを変更
   * @param id タスクID
   */
  updateDone(id: string) {
    this.tasks[id].done = !this.tasks[id].done;
    this.setStorageTasks();
  }
}
