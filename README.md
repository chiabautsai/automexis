# Automexis

Automexis is an automation script designed to process incoming file metadata and perform various tasks based on the data. It uses parser to extract relevant information from the file metadata, query external APIs for additional data, and post the processed information to a designated forum.

## Features

- **Metadata Processing:** Automexis processes incoming file metadata to extract relevant information such as artist name, album title, language, and more.
- **API Integration:** The script integrates with external APIs to retrieve additional information about the file, such as album details and track information.
- **Forum Posting:** Automexis posts the processed information to a designated forum, including the album details, tracklist, and other relevant data.
- **Customizable Responses:** Users can customize the responses and post format according to their specific needs.
- **Error Handling:** The script includes error handling to ensure that processing errors are appropriately managed and logged.

## Installation

As a Cloudflare Worker, Automexis is deployed directly onto the Cloudflare platform. To get started:

1. Clone the repository to your local machine.
2. Follow the Cloudflare documentation to deploy the script as a Cloudflare Worker.

## Usage

To use Automexis, deploy it as a Cloudflare Worker and configure your Cloudflare settings accordingly. Ensure that your worker handles incoming requests at the desired endpoint, and the script will take care of the rest. Note that you must set the environment variables `cdb_auth` and `SECRET_TOKEN` for it to run properly. 

```javascript
import worker from './worker';

// Initialize the worker
const automexisWorker = worker();

// Handle incoming requests
automexisWorker.fetch(request, env, ctx);
```

## API Endpoints

### `/api/incoming`

This endpoint is used to handle incoming file metadata and process it. The script will extract relevant information, query external APIs, and post the processed data to the designated forum.

- Method: POST
- Body: JSON object containing file metadata
- Response: JSON object with the processed data and forum post status

## Customization

You can customize the behavior of Automexis by modifying the `automation.js` file. Adjust the API endpoints, integration with external APIs, and forum posting logic to meet your specific requirements.

## Contribution

We welcome contributions to enhance and expand the capabilities of Automexis. If you would like to contribute, please follow these steps:

1. Fork the repository and create a new branch for your contributions.
2. Implement your changes and improvements.
3. Test your changes to ensure they do not break existing functionality.
4. Submit a pull request, detailing the changes made and the reason for them.

## License

This project is licensed under the [GNU v3](LICENSE).