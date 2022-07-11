class App {
  async run(): Promise<void> {
    console.log('Hello World!');
  }
}

new App().run().catch(console.error);

export {};
