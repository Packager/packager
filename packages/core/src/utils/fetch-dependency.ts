import resolver from "./dependency-resolver";

const services: Record<string, Record<string, any>> = {
  unpkg: {
    url: "https://unpkg.com",
  },
  jsdelivr: {
    url: "https://cdn.jsdelivr.net/npm",
  },
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

type NpmDependency = {
  code: string;
  meta: {
    status: number;
    url: string;
  };
};

const fetchDependency = async (
  name: string,
  version: number | string = "latest",
  path: string = "",
  service = "unpkg"
): Promise<NpmDependency | null> => {
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
      return fetchDependency(name, version, path, nextService);
    } else {
      return null;
    }
  }
};

export default fetchDependency;
