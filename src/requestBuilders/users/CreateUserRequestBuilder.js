const CreateUserRequestBuilder = class CreateUserRequestBuilder {
    constructor(request) {
        this.request = request;
        this.url = 'https://reqres.in/api/users';
        this.headers = {
            'Content-Type': 'application/json',
            'x-api-key': 'free_user_3EcX0UDaJNju7BccFi6tMsMVWLg',
        };
        this.body = {};
    }

    withName(name) {
        this.body.name = name;
        return this;
    }

    withJob(job) {
        this.body.job = job;
        return this;
    }

    async execute() {
        console.log(`[RequestBuilder] ${this.url}`);
        console.log(`[RequestBuilder] Method: POST`);
        console.log(`[RequestBuilder] Body: ${JSON.stringify(this.body)}`);

        const response = await this.request.post(this.url, {
            headers: this.headers,
            data: this.body,
        });

        console.log(`[RequestBuilder] Status: ${response.status()}`);
        return response;
    }
};

module.exports = { CreateUserRequestBuilder };
