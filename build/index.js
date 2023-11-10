var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
};

// node_modules/@remix-run/dev/dist/config/defaults/entry.server.node.tsx
var entry_server_node_exports = {};
__export(entry_server_node_exports, {
  default: () => handleRequest
});
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import isbot from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { jsx } from "react/jsx-runtime";
var ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent")) ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.jsx
var root_exports = {};
__export(root_exports, {
  default: () => App
});
import { Links, Meta, Outlet, Scripts, LiveReload } from "@remix-run/react";
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
function App() {
  return /* @__PURE__ */ jsxs("html", { children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx2("link", { rel: "icon", href: "data:image/x-icon;base64,AA" }),
      /* @__PURE__ */ jsx2(Meta, {}),
      /* @__PURE__ */ jsx2(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsx2(Outlet, {}),
      /* @__PURE__ */ jsx2(Scripts, {}),
      /* @__PURE__ */ jsx2(LiveReload, {})
    ] })
  ] });
}

// app/routes/profile.jsx
var profile_exports = {};
__export(profile_exports, {
  default: () => Profile,
  links: () => links,
  loader: () => loader
});
import { useLoaderData } from "@remix-run/react";

// app/styles/ProfileStyles.css
var ProfileStyles_default = "/build/_assets/ProfileStyles-TJ7ALQDD.css";

// app/routes/profile.jsx
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var links = () => [{ rel: "stylesheet", href: ProfileStyles_default }], loader = async ({ request }) => {
  let cookieHeader = request.headers.get("Cookie"), submittedData = new Map(
    cookieHeader?.split(";").map((c) => c.trim().split("="))
  ).get("submittedData");
  return submittedData ? { submittedData: JSON.parse(decodeURIComponent(submittedData)) } : { submittedData: null };
};
function Profile() {
  let { submittedData } = useLoaderData();
  return submittedData ? /* @__PURE__ */ jsxs2("div", { className: "submitted-data-container", children: [
    /* @__PURE__ */ jsx3("h1", { className: "submitted-data-header", children: "Submitted Data" }),
    /* @__PURE__ */ jsxs2("p", { className: "submitted-data-paragraph", children: [
      /* @__PURE__ */ jsx3("strong", { className: "submitted-data-bold", children: "Title:" }),
      " ",
      submittedData.title
    ] }),
    /* @__PURE__ */ jsxs2("p", { className: "submitted-data-paragraph", children: [
      /* @__PURE__ */ jsx3("strong", { className: "submitted-data-bold", children: "Body:" }),
      " ",
      submittedData.body
    ] }),
    /* @__PURE__ */ jsxs2("p", { className: "submitted-data-paragraph", children: [
      /* @__PURE__ */ jsx3("strong", { className: "submitted-data-bold", children: "User ID:" }),
      " ",
      submittedData.userId
    ] })
  ] }) : /* @__PURE__ */ jsx3("div", { children: "No data submitted yet. Please fill out the form." });
}

// app/routes/index.jsx
var routes_exports = {};
__export(routes_exports, {
  action: () => action,
  default: () => Index,
  links: () => links2,
  loader: () => loader2
});
import { useLoaderData as useLoaderData2, useActionData } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import axios from "axios";

// app/styles/FormStyles.css
var FormStyles_default = "/build/_assets/FormStyles-KKCU2BT4.css";

// app/routes/index.jsx
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
var links2 = () => [{ rel: "stylesheet", href: FormStyles_default }], loader2 = async () => {
  let usersResponse = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  return json(usersResponse.data);
}, action = async ({ request }) => {
  let formData = await request.formData(), title = formData.get("title"), body = formData.get("body"), userName = formData.get("userName"), isHuman = formData.get("isHuman");
  if (!title || !body || !userName || !isHuman)
    return json({ error: "All fields are required" }, { status: 400 });
  let postResponse = await axios.post(
    "https://jsonplaceholder.typicode.com/posts",
    {
      title,
      body,
      userId: userName
      // Assuming userName is the userId
    }
  );
  return redirect("/profile", {
    headers: {
      "Set-Cookie": `submittedData=${JSON.stringify(
        postResponse.data
      )}; Path=/; HttpOnly`
    }
  });
};
function Index() {
  let users = useLoaderData2(), actionData = useActionData();
  return /* @__PURE__ */ jsxs3("form", { method: "post", className: "form", children: [
    /* @__PURE__ */ jsxs3("div", { className: "form-group", children: [
      /* @__PURE__ */ jsx4("label", { htmlFor: "title", className: "form-label", children: "Title:" }),
      /* @__PURE__ */ jsx4(
        "input",
        {
          className: "form-input",
          type: "text",
          id: "title",
          name: "title",
          required: !0
        }
      ),
      actionData?.errors.title && /* @__PURE__ */ jsx4("p", { children: actionData.errors.title })
    ] }),
    /* @__PURE__ */ jsxs3("div", { className: "form-group", children: [
      /* @__PURE__ */ jsx4("label", { htmlFor: "body", className: "form-label", children: "Body:" }),
      /* @__PURE__ */ jsx4(
        "textarea",
        {
          className: "form-textarea",
          id: "body",
          name: "body",
          required: !0
        }
      ),
      actionData?.errors.body && /* @__PURE__ */ jsx4("p", { children: actionData.errors.body })
    ] }),
    /* @__PURE__ */ jsxs3("div", { className: "form-group", children: [
      /* @__PURE__ */ jsx4("label", { className: "form-label", htmlFor: "userName", children: "UserName:" }),
      /* @__PURE__ */ jsx4("select", { className: "form-select", id: "userName", name: "userName", required: !0, children: users.map(
        (user) => /* @__PURE__ */ jsx4("option", { className: "form-option", value: user.id, children: user.name }, user.id)
      ) }),
      actionData?.errors.userName && /* @__PURE__ */ jsx4("p", { children: actionData.errors.userName })
    ] }),
    /* @__PURE__ */ jsxs3("div", { className: "form-group", children: [
      /* @__PURE__ */ jsxs3("label", { className: "form-label", htmlFor: "isHuman", children: [
        /* @__PURE__ */ jsx4(
          "input",
          {
            className: "form-checkbox",
            type: "checkbox",
            id: "isHuman",
            name: "isHuman",
            required: !0
          }
        ),
        "I am a human"
      ] }),
      actionData?.errors.isHuman && /* @__PURE__ */ jsx4("p", { children: actionData.errors.isHuman })
    ] }),
    /* @__PURE__ */ jsx4("button", { className: "button", type: "submit", children: "Submit" })
  ] });
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-D7KQJUVI.js", imports: ["/build/_shared/chunk-BRVXBROF.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-SA2XNHOE.js", imports: void 0, hasAction: !1, hasLoader: !1, hasErrorBoundary: !1 }, "routes/index": { id: "routes/index", parentId: "root", path: "index", index: void 0, caseSensitive: void 0, module: "/build/routes/index-NVSZB7M6.js", imports: void 0, hasAction: !0, hasLoader: !0, hasErrorBoundary: !1 }, "routes/profile": { id: "routes/profile", parentId: "root", path: "profile", index: void 0, caseSensitive: void 0, module: "/build/routes/profile-USZZ6XP5.js", imports: void 0, hasAction: !1, hasLoader: !0, hasErrorBoundary: !1 } }, version: "0c89ac8f", hmr: void 0, url: "/build/manifest-0C89AC8F.js" };

// server-entry-module:@remix-run/dev/server-build
var mode = "production", assetsBuildDirectory = "public/build", future = { v3_fetcherPersist: !1 }, publicPath = "/build/", entry = { module: entry_server_node_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/profile": {
    id: "routes/profile",
    parentId: "root",
    path: "profile",
    index: void 0,
    caseSensitive: void 0,
    module: profile_exports
  },
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: "index",
    index: void 0,
    caseSensitive: void 0,
    module: routes_exports
  }
};
export {
  assets_manifest_default as assets,
  assetsBuildDirectory,
  entry,
  future,
  mode,
  publicPath,
  routes
};
