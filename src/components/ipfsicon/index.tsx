import * as React from "react";
import axios from "axios";
import { extractIPFSHashFromImageURL } from "../../utilities";
const IPFSIcon = function (_a) {
  const icon = _a.icon;
  const _b = React.useState(""),
    imageInBase64 = _b[0],
    setImageInBase64 = _b[1];
  // fetch and pin the icons using ipfs hash
  React.useEffect(
    function () {
      // extract the IPFS image url from the url of the icon
      const _a = extractIPFSHashFromImageURL(icon),
        type = _a.type,
        ipfsHash = _a.url;
      if (!ipfsHash) return;
      // fetch the image directly from ipfs
      if (type === "http") {
        axios
          .get(ipfsHash)
          .then(function (_a) {
            const res = _a.data;
            setImageInBase64(res.icon);
          })
          .catch(function (err) {
            console.log(err);
          });
      } else {
        setImageInBase64(ipfsHash);
      }
    },
    [icon]
  );
  return React.createElement("img", {
    style: { width: "100%" },
    src: imageInBase64,
    alt: "",
  });
};
export default IPFSIcon;
//# sourceMappingURL=index.js.map
