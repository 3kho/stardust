import Dockerode, { type DockerOptions } from "dockerode";
const generateConfig = (): DockerOptions => {
	const connectionType = process.env.DOCKER_TYPE;
	switch (connectionType) {
		case "socket": {
			return {
				socketPath: process.env.DOCKER_SOCKET,
			};
		}
		case "http": {
			return {
				port: process.env.DOCKER_PORT,
				protocol: "http",
				host: process.env.CONTAINER_HOST,
			};
		}
		default: {
			throw new Error("Invalid connection type");
		}
	}
};
const docker = new Dockerode(generateConfig());
export default docker;
