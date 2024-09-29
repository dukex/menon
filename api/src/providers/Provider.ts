import YoutubeProvider from "./youtube/provider"
import IProvider from "./IProvider"
import { ProviderNotFoundError } from "../types"

const providers = {
	"youtube-playlist": YoutubeProvider
}

export default class Provider {
	static fetch(name: string, { key, source }: { key: string, source: string }): IProvider {
		const FoundProvider = providers[name]

		if (!FoundProvider) {
			throw new ProviderNotFoundError()
		}

		return new FoundProvider(key, source)
	}
}
