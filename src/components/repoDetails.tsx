import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Repository } from "../interfaces";
import { getRepoUser } from "../services";

const RepoDetail = () => {
  const [gitRepoData, setGitRepoData] = useState<Repository>();
  const [cloneCopy, setCloneCopy] = useState(false);
  const { name, username } = useParams<string>();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (name && username) {
      const getGitUser = async () => {
        const { data } = await getRepoUser(signal, name, username);

        setGitRepoData(data);
        return data;
      };
      getGitUser().catch((e) => console.error(e));
    } else {
      console.error("name or username is missing");
    }

    return () => {
      controller.abort();
    };
  }, [username, name]);
  return (
    <div>
      <div className="top-cont">
        {gitRepoData ? (
          <>
            <img
              className="avatar-img"
              src={gitRepoData.owner.avatar_url}
              alt=""
              style={{ width: "30%" }}
            />
            <div className="name-cont">
              <span className="username">
                Owner:{" "}
                <Link to={`/users/user/${gitRepoData.owner.login}`}>
                  {gitRepoData.owner.login}
                </Link>
              </span>
              <span className="repo-lang-span">
                Language: {gitRepoData.language}
              </span>
              <h2>{gitRepoData.name}</h2>
              <div className="follow-cont">
                <a
                  className="view-ongit-a"
                  href={gitRepoData.html_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  View on GitHub
                </a>
                <div>
                  <input
                    className="clone-url-inp"
                    type="text"
                    value={gitRepoData.clone_url}
                    onChange={() => {}}
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(gitRepoData.clone_url);
                      setCloneCopy((isCopied) => !isCopied);
                      setTimeout(
                        () => setCloneCopy((isCopied) => !isCopied),
                        10000
                      );
                    }}
                  >
                    {cloneCopy ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </div>
  );
};
export default RepoDetail;
