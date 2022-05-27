import { __awaiter, __generator, __makeTemplateObject } from "tslib";
import * as React from "react";
import * as PropTypes from "prop-types";
import styled from "styled-components";
import * as moment from "moment";
import IPFSIcon from "../ipfsicon";
import ImageOverlayComponent from "../overlay";
import ParseMarkdownText from "../parsetext";
import MediaHelper from "../../utilities/mediaHelper";
import Loader from "../loader/loader";
import { extractTimeStamp } from "../../utilities";
import ChainImages from '../../constants/chain';
import ActionButton from './styled/ActionButton';
import { useDecrypt, DecryptButton } from './decrypt';
// ================= Define base component
const ViewNotificationItem = function (_a) {
    const notificationTitle = _a.notificationTitle, notificationBody = _a.notificationBody, cta = _a.cta, app = _a.app, icon = _a.icon, image = _a.image, url = _a.url, isSpam = _a.isSpam, //for rendering the spam conterpart of the notification component
    isSubscribedFn = _a.isSubscribedFn, //A function for getting if a user is subscribed to the channel in question
    subscribeFn = _a.subscribeFn, //A function for subscribing to the spam channel
    theme = _a.theme, //for specifying light and dark theme
    chainName = _a.chainName, isSecret = _a.isSecret, decryptFn = _a.decryptFn;
    const _b = extractTimeStamp(notificationBody || ""), parsedBody = _b.notificationBody, timeStamp = _b.timeStamp;
    const rightIcon = chainName && ChainImages['CHAIN_ICONS'][chainName]; //get the right chain id to render if any
    const _c = useDecrypt(isSecret, { notificationTitle: notificationTitle, parsedBody: parsedBody, cta: cta, image: image }), notifTitle = _c.notifTitle, notifBody = _c.notifBody, notifCta = _c.notifCta, notifImage = _c.notifImage, setDecryptedValues = _c.setDecryptedValues, isSecretRevealed = _c.isSecretRevealed;
    // store the image to be displayed in this state variable
    const _d = React.useState(""), imageOverlay = _d[0], setImageOverlay = _d[1];
    const _e = React.useState(false), subscribeLoading = _e[0], setSubscribeLoading = _e[1];
    const _f = React.useState(true), isSubscribed = _f[0], setIsSubscribed = _f[1]; //use this to confirm if this is s
    // console.log({
    //   chainName,
    //   rightIcon,
    //   ai: ChainImages['CHAIN_ICONS']
    // })
    const gotToCTA = function (e) {
        e.stopPropagation();
        if (!MediaHelper.validURL(notifCta))
            return;
        window.open(notifCta, "_blank");
    };
    const goToURL = function (e) {
        e.stopPropagation();
        window.open(url, "_blank");
    };
    /**
     * A function which wraps around the function to subscribe a user to a channel
     * @returns
     */
    const onSubscribe = function (clickEvent) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    clickEvent.preventDefault();
                    clickEvent.stopPropagation();
                    if (!subscribeFn)
                        return [2 /*return*/];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, , 3, 4]);
                    setSubscribeLoading(true);
                    return [4 /*yield*/, subscribeFn()];
                case 2:
                    _a.sent();
                    setIsSubscribed(true);
                    return [3 /*break*/, 4];
                case 3:
                    setSubscribeLoading(false);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    const onDecrypt = function () { return __awaiter(void 0, void 0, void 0, function () {
        let decryptedPayload, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    return [4 /*yield*/, decryptFn()];
                case 1:
                    decryptedPayload = _a.sent();
                    // to check if always both title, body are present
                    if (decryptedPayload) {
                        setDecryptedValues(decryptedPayload);
                    }
                    return [3 /*break*/, 4];
                case 2:
                    e_1 = _a.sent();
                    return [3 /*break*/, 4];
                case 3: return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    React.useEffect(function () {
        if (!isSpam || !isSubscribedFn)
            return;
        isSubscribedFn().then(function (res) {
            setIsSubscribed(Boolean(res));
        });
    }, [isSubscribedFn, isSpam]);
    if (isSubscribed && isSpam)
        return React.createElement(React.Fragment, null);
    // render
    return (React.createElement(Container, { timestamp: timeStamp, cta: MediaHelper.validURL(notifCta), onClick: gotToCTA, theme: theme },
        React.createElement(MobileHeader, { onClick: goToURL, theme: theme },
            React.createElement(HeaderButton, null,
                React.createElement(ImageContainer, { theme: theme },
                    React.createElement(IPFSIcon, { icon: icon })),
                app),
            rightIcon && (React.createElement(HeaderImg, { src: rightIcon }))),
        React.createElement(ContentSection, null,
            notifImage &&
                // if its an image then render this
                (!MediaHelper.isMediaSupportedVideo(notifImage) ? (React.createElement(MobileImage, { style: { cursor: "pointer" }, onClick: function () { return setImageOverlay(notifImage || ""); } },
                    React.createElement("img", { src: notifImage, alt: "" }))) : // if its a youtube url, RENDER THIS
                    MediaHelper.isMediaYoutube(notifImage) ? (React.createElement(MobileImage, null,
                        React.createElement("iframe", { id: "ytplayer", width: "640", allow: "fullscreen;", height: "360", src: MediaHelper.isMediaExternalEmbed(notifImage) }))) : (
                    // if its aN MP4 url, RENDER THIS
                    React.createElement(MobileImage, null,
                        React.createElement("video", { width: "360", height: "100%", controls: true },
                            React.createElement("source", { src: notifImage, type: "video/mp4" }),
                            "Your browser does not support the video tag.")))),
            React.createElement(ChannelDetailsWrapper, null,
                React.createElement(ChannelTitle, null,
                    React.createElement(ChannelTitleLink, { theme: theme }, notifTitle)),
                React.createElement(ChannelDesc, null,
                    React.createElement(ChannelDescLabel, { theme: theme },
                        React.createElement(ParseMarkdownText, { text: notifBody })))),
            React.createElement(ButtonGroup, null,
                isSpam && (React.createElement(ActionButton, { onClick: onSubscribe }, subscribeLoading ? React.createElement(Loader, null) : "opt-in")),
                isSecret ? (React.createElement(DecryptButton, { decryptFn: onDecrypt, isSecretRevealed: isSecretRevealed })) : null)),
        React.createElement(ChannelMeta, { hidden: !timeStamp },
            React.createElement(React.Fragment, null,
                React.createElement(Pool, null,
                    React.createElement(PoolShare, { theme: theme }, timeStamp
                        ? moment
                            .utc(parseInt(timeStamp) * 1000)
                            .local()
                            .format("DD MMM YYYY | hh:mm A")
                        : "N/A")))),
        React.createElement(ImageOverlayComponent, { imageOverlay: imageOverlay, setImageOverlay: setImageOverlay })));
};
// ================= Define default props
ViewNotificationItem.propTypes = {
    notificationBody: PropTypes.string,
    notificationTitle: PropTypes.string,
    cta: PropTypes.string,
    image: PropTypes.string,
    app: PropTypes.string,
    url: PropTypes.string,
    isSpam: PropTypes.bool,
    subscribeFn: PropTypes.func,
    isSubscribedFn: PropTypes.func,
    theme: PropTypes.string
};
ViewNotificationItem.defaultProps = {
    notificationTitle: "",
    notificationBody: "",
    cta: "",
    app: "",
    image: "",
    url: "",
    isSpam: false,
    subscribeFn: null,
    isSubscribedFn: null,
    theme: "light",
};
// ================= Define styled components
const MD_BREAKPOINT = "50050px"; //set an arbitrarily large number because we no longer use this breakpoint
const SM_BREAKPOINT = "900px";
var ContentSection = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: block;\n  @media (min-width: ", ") {\n    margin-top: 5px;\n    align-items: center;\n    display: flex;\n    flex-direction: row;\n    gap: 20px;\n    justify-content: space-between;\n  }\n"], ["\n  display: block;\n  @media (min-width: ", ") {\n    margin-top: 5px;\n    align-items: center;\n    display: flex;\n    flex-direction: row;\n    gap: 20px;\n    justify-content: space-between;\n  }\n"])), SM_BREAKPOINT);
var HeaderImg = styled.img(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width: 30px;\n  height:30px;\n"], ["\n  width: 30px;\n  height:30px;\n"])));
var MobileImage = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  @media (min-width: ", ") {\n    width: 220px;\n    height: 200px;\n    img,\n    iframe,\n    video {\n      width: 100% !important;\n      height: 100% !important;\n      width: 100%;\n      object-fit: cover;\n      border-radius: 10px;\n      border: 0;\n    }\n  }\n  @media (max-width: ", ") {\n    display: block;\n    img,\n    iframe,\n    video {\n      border: 0;\n      width: calc(100% + 42px) !important;\n      margin-left: -20px;\n      // margin-right: -40px;\n      margin-top: -12px;\n      margin-bottom: 5px;\n    }\n  }\n"], ["\n  @media (min-width: ", ") {\n    width: 220px;\n    height: 200px;\n    img,\n    iframe,\n    video {\n      width: 100% !important;\n      height: 100% !important;\n      width: 100%;\n      object-fit: cover;\n      border-radius: 10px;\n      border: 0;\n    }\n  }\n  @media (max-width: ", ") {\n    display: block;\n    img,\n    iframe,\n    video {\n      border: 0;\n      width: calc(100% + 42px) !important;\n      margin-left: -20px;\n      // margin-right: -40px;\n      margin-top: -12px;\n      margin-bottom: 5px;\n    }\n  }\n"])), SM_BREAKPOINT, SM_BREAKPOINT);
var ImageContainer = styled.span(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  background: ", ";\n  height: 24px;\n  width: 24px;\n  display: inline-block;\n  margin-right: 10px;\n  border-radius: 5px;\n"], ["\n  background: ", ";\n  height: 24px;\n  width: 24px;\n  display: inline-block;\n  margin-right: 10px;\n  border-radius: 5px;\n"])), function (props) { return (props.theme === "light" ? "#ededed" : "#444"); });
var ChannelDetailsWrapper = styled.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  //   align-self: center;\n"], ["\n  //   align-self: center;\n"])));
var Container = styled.div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  position: relative;\n  overflow: hidden;\n  font-family: \"Source Sans Pro\", Arial, sans-serif;\n  flex: 1;\n  display: flex;\n  flex-wrap: wrap;\n  border: ", ";\n  cursor: ", ";\n\n  background: ", ";\n  border-radius: 10px;\n\n  margin: 15px 0px;\n  justify-content: center;\n  padding: 20px;\n\n  justify-content: space-between;\n\n  @media (max-width: ", ") {\n    flex-direction: column;\n    padding-top: 48px;\n    padding-bottom: ", ";\n  }\n"], ["\n  position: relative;\n  overflow: hidden;\n  font-family: \"Source Sans Pro\", Arial, sans-serif;\n  flex: 1;\n  display: flex;\n  flex-wrap: wrap;\n  border: ", ";\n  cursor: ", ";\n\n  background: ", ";\n  border-radius: 10px;\n\n  margin: 15px 0px;\n  justify-content: center;\n  padding: 20px;\n\n  justify-content: space-between;\n\n  @media (max-width: ", ") {\n    flex-direction: column;\n    padding-top: 48px;\n    padding-bottom: ", ";\n  }\n"])), function (props) {
    return props.cta
        ? "0.5px solid #35C5F3"
        : (props.theme === "light" ? "1px solid rgba(231.0, 231.0, 231.0, 1);" : "1px solid #444");
}, function (props) { return (props.cta ? "pointer" : ""); }, function (props) { return (props.theme === "light" ? "#fff" : "#000"); }, MD_BREAKPOINT, function (props) { return (props.timestamp ? "40px" : "22px"); });
var MobileHeader = styled.div(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  display: none;\n  @media (max-width: ", ") {\n    cursor: pointer;\n    display: flex;\n    align-items: center;\n    position: absolute;\n    justify-content:space-between;  \n    top: 0;\n    left: 0;\n    right: 0;\n    padding: 6px 20px;\n    font-size: 14px;\n    font-weight: 700;\n    border-bottom: ", ";\n    color: #808080;\n    background: ", ";\n    border-top-left-radius: 10px;\n    border-top-right-radius: 10px;\n    text-align: left;\n  }\n"], ["\n  display: none;\n  @media (max-width: ", ") {\n    cursor: pointer;\n    display: flex;\n    align-items: center;\n    position: absolute;\n    justify-content:space-between;  \n    top: 0;\n    left: 0;\n    right: 0;\n    padding: 6px 20px;\n    font-size: 14px;\n    font-weight: 700;\n    border-bottom: ", ";\n    color: #808080;\n    background: ", ";\n    border-top-left-radius: 10px;\n    border-top-right-radius: 10px;\n    text-align: left;\n  }\n"])), MD_BREAKPOINT, function (props) { return (props.theme === "light" ? "1px solid #ededed" : "1px solid #444"); }, function (props) { return (props.theme === "light" ? "#fafafa" : "#222"); });
var HeaderButton = styled.div(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n"], ["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n"])));
var ChannelTitle = styled.div(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  text-align: left;\n  margin-bottom: 10px;\n"], ["\n  text-align: left;\n  margin-bottom: 10px;\n"])));
var ChannelTitleLink = styled.a(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n  text-decoration: none;\n  color: #e20880;\n  font-size: 18px;\n  font-weight: 600;\n\n  @media (max-width: ", ") {\n    font-weight: 300;\n    color: ", ";\n  }\n"], ["\n  text-decoration: none;\n  color: #e20880;\n  font-size: 18px;\n  font-weight: 600;\n\n  @media (max-width: ", ") {\n    font-weight: 300;\n    color: ", ";\n  }\n"])), MD_BREAKPOINT, function (props) { return (props.theme === "light" ? "rgba(0, 0, 0, 0.5)" : "#808080"); });
var ChannelDesc = styled.div(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n  line-height: 20px;\n  flex: 1;\n  display: flex;\n  font-size: 14px;\n  color: rgba(0, 0, 0, 0.75);\n  font-weight: 400;\n  flex-direction: column;\n"], ["\n  line-height: 20px;\n  flex: 1;\n  display: flex;\n  font-size: 14px;\n  color: rgba(0, 0, 0, 0.75);\n  font-weight: 400;\n  flex-direction: column;\n"])));
var ChannelDescLabel = styled.label(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n  color: ", ";\n  flex: 1;\n  margin: 0px;\n  // font-weight: 600;\n  text-align: left;\n"], ["\n  color: ", ";\n  flex: 1;\n  margin: 0px;\n  // font-weight: 600;\n  text-align: left;\n"])), function (props) { return (props.theme === "light" ? "#000" : "#fff"); });
var ChannelMeta = styled.div(templateObject_13 || (templateObject_13 = __makeTemplateObject(["\n  display: ", ";\n  flex-direction: row;\n  font-size: 13px;\n"], ["\n  display: ", ";\n  flex-direction: row;\n  font-size: 13px;\n"])), function (props) { return (props.hidden ? "none" : "flex"); });
const ChannelMetaBox = styled.label(templateObject_14 || (templateObject_14 = __makeTemplateObject(["\n  color: #fff;\n  // font-weight: 600;\n  padding: 10px;\n  border-radius: 10px;\n  font-size: 12px;\n  align-self: flex-end;\n"], ["\n  color: #fff;\n  // font-weight: 600;\n  padding: 10px;\n  border-radius: 10px;\n  font-size: 12px;\n  align-self: flex-end;\n"])));
var Pool = styled.div(templateObject_15 || (templateObject_15 = __makeTemplateObject(["\n  margin: 0px 10px;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n"], ["\n  margin: 0px 10px;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n"])));
var PoolShare = styled(ChannelMetaBox)(templateObject_16 || (templateObject_16 = __makeTemplateObject(["\n  background: ", ";\n  @media (max-width: ", ") {\n    position: absolute;\n    bottom: 0;\n    right: 0;\n    border-radius: 0;\n    border-radius: 8px 0;\n    color: #808080;\n    font-weight:700;\n    background: ", ";\n    border-top: ", ";\n    border-left: ", ";\n    padding: 5px 10px;\n  }\n"], ["\n  background: ", ";\n  @media (max-width: ", ") {\n    position: absolute;\n    bottom: 0;\n    right: 0;\n    border-radius: 0;\n    border-radius: 8px 0;\n    color: #808080;\n    font-weight:700;\n    background: ", ";\n    border-top: ", ";\n    border-left: ", ";\n    padding: 5px 10px;\n  }\n"])), function (props) { return (props.theme === "light" ? "#674c9f" : "#414141"); }, MD_BREAKPOINT, function (props) { return (props.theme === "light" ? "rgba(250, 250, 250, 1)" : "#222"); }, function (props) { return (props.theme === "light" ? "1px solid #ededed" : "1px solid #444"); }, function (props) { return (props.theme === "light" ? "1px solid #ededed" : "1px solid #444"); });
var ButtonGroup = styled.div(templateObject_17 || (templateObject_17 = __makeTemplateObject(["\n  display: flex;\n  gap: 20px;\n"], ["\n  display: flex;\n  gap: 20px;\n"])));
// Export Default
export default ViewNotificationItem;
let templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17;
//# sourceMappingURL=index.js.map