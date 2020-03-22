import resolver from "./external-resolver";

const services: { [key: string]: { [key: string]: string } } = {
  unpkg: {
    url: "https://unpkg.com"
  },
  jsdelivr: {
    url: "https://cdn.jsdelivr.net"
  }
};

const getNextService = (currentService: string): string | null => {
  const serviceNames = Object.keys(services);
  const currentIndex = serviceNames.indexOf(currentService);

  // If current service is last, return null
  if (currentIndex >= serviceNames.length - 1) {
    return null;
  }

  return serviceNames[currentIndex + 1];
};

type FetchedNpmDependency = {
  code: string;
  transformedCode?: string;
  meta: {
    name: string;
    status: number;
    url: string;
  };
};

export default async function fetchNpmDependency(
  name: string,
  version: number | string = "latest",
  path: string = "",
  service = "unpkg"
): Promise<FetchedNpmDependency | null> {
  try {
    const _service = services[service];
    const fullPath = `${_service.url}/${name}@${version}${
      path != "" && !path.startsWith("/") ? `/${path}` : path
    }`;
    const data = await resolver(fullPath);

    return data;
  } catch (e) {
    const nextService = getNextService(service);

    if (nextService) {
      return fetchNpmDependency(name, version, path, nextService);
    } else {
      return null;
    }
  }
}
