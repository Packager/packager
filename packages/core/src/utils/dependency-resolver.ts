const dependencyResolver = async (
  path: string,
  retries = 1,
  maxRetries = 3
): Promise<any | never> => {
  try {
    const data = await fetch(path).then(async (res) => ({
      code: await res.text(),
      meta: {
        url: res.url,
        status: res.status,
      },
    }));

    return data;
  } catch ({ response }) {
    if (response.status === 404) {
      throw Error("Not found.");
    }

    if (retries < maxRetries) {
      return dependencyResolver(path, retries + 1);
    } else {
      throw Error("Error retrieving data.");
    }
  }
};

export default dependencyResolver;
