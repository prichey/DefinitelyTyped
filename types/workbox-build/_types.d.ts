import { RouteHandlerCallback, RouteMatchCallback } from 'workbox-routing';

export interface ManifestEntry {
    /**
     * The URL to the asset in the manifest.
     */
    url: string;

    /**
     * The revision details for the file. This is a hash generated by node
     * based on the file contents.
     */
    revision?: string;

    /**
     * Integrity metadata that will be used when making the network request
     * for the URL. based on the file contents.
     */
    integrity?: string;
}

export type ManifestTransform = (
    /**
     * The full array of entries, prior to the current transformation.
     */
    manifestEntries: Array<ManifestEntry>,

    /**
     * When used in the webpack plugins, this param
     * will be set to the current `compilation`.
     */
    compilation?: Object,
) => Promise<ManifestTransformResult>;

export interface ManifestTransformResult {
    manifest: Array<ManifestEntry>;
    warnings: Array<string | undefined>;
}

export interface RuntimeCachingEntry {
    /**
     * * Either the name of one of the [built-in strategy classes](https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-strategies)
     * or custom handler callback to use when the generated route matches.
     */
    handler: string | RouteHandlerCallback;

    /**
     * The value that will be passed to [`registerRoute()`](https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-routing#.registerRoute),
     * used to determine whether the generated route will match a given request.
     */
    urlPattern: string | RegExp | RouteMatchCallback;

    /**
     * The [HTTP method](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) that
     * will match the generated route.
     *
     * @default 'GET'
     */
    method?: string;

    options?: RuntimeCachingEntryOptions;
}

export interface RuntimeCachingEntryOptions {
    backgroundSync?: {
        /**
         * The `name` property to use when creating the
         * [`BackgroundSyncPlugin`](https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-background-sync.BackgroundSyncPlugin).
         */
        name?: string;

        /**
         * The `options` property to use when creating the
         * [`BackgroundSyncPlugin`](https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-background-sync.BackgroundSyncPlugin).
         */
        options?: Object;
    };

    broadcastUpdate?: {
        /**
         * The `channelName` property to use when creating the
         * [`BroadcastCacheUpdatePlugin`](https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-broadcast-update.BroadcastUpdatePlugin).
         */
        channelName?: string;

        /**
         * The `options` property to use when creating the
         * [`BroadcastCacheUpdatePlugin`](https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-broadcast-update.BroadcastUpdatePlugin).
         */
        options?: Object;
    };

    cacheableResponse?: {
        /**
         * The `headers` property to use when creating the
         * [`CacheableResponsePlugin`](https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-cacheable-response.CacheableResponsePlugin).
         */
        headers?: Object;

        /**
         * The `statuses` property to use when creating the
         * [`CacheableResponsePlugin`](https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-cacheable-response.CacheableResponsePlugin).
         */
        statuses?: Array<number>;
    };

    /**
     * The `cacheName` to use when constructing one of the [Workbox strategy classes](https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-strategies.html).
     */
    cacheName?: string;

    /**
     * The `fetchOptions` property value to use when constructing one of the
     * [Workbox strategy classes](https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-strategies.html).
     */
    fetchOptions?: Object;

    expiration?: {
        /**
         * The `maxAgeSeconds` property to use when creating the
         * [`ExpirationPlugin`](https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-expiration.ExpirationPlugin.html)
         */
        maxAgeSeconds?: number;

        /**
         * The `maxEntries` property to use when creating the
         * [`ExpirationPlugin`](https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-expiration.ExpirationPlugin.html)
         */
        maxEntries?: number;
    };

    /**
     * The `matchOptions` property value to use when constructing one of the
     * [Workbox strategy classes](https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-strategies.html).
     */
    matchOptions?: Object;

    /**
     * The `networkTimeoutSeconds` property value to use when creating a
     * [`NetworkFirst`](https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-strategies.NetworkFirst) strategy.
     */
    networkTimeoutSeconds?: number;

    /**
     * One or more [additional plugins](https://developers.google.com/web/tools/workbox/guides/using-plugins#custom_plugins)
     * to apply to the handler. Useful when you want a plugin that doesn't have a
     * "shortcut" configuration.
     */
    plugins?: Array<Object>;
}
