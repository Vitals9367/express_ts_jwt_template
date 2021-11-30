import app from '../server';

before((done) => {
    app.on('appStarted', () => {
        console.log('\n\n\n================ STARTING TESTS ================\n')
        done();
    })
})

after((done) => {
    console.log('\n\n\n================ TESTS ENDED ================\n')
    done();
})

export default app;