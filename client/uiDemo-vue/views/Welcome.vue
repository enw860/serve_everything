<style lang="less">
@import "../../controls/style/theme/theme.less";

.Welcome {
	.Bullet-point:not(:last-child) {
		margin-bottom: 48px;
	}

	.BP-title {
		font-size: 32px;
		line-height: 32px;
		margin-bottom: 16px;
	}

	.BP-body p {
		max-width: 800px;
	}

	.Feature-row {
		display: flex;
		align-items: flex-start;

		strong {
			font-weight: 500;
			width: 90px;
			min-width: 90px;
			display: inline-block;
		}
	}
}
</style>

<template>
	<div class="Welcome VLayout">
		<section class="Bullet-point">
			<DisplayText class="BP-title" value="About" />
			<div class="BP-body">
				<p>
					This site is used for demostrating the usage of compositing
					a website by the
					<Link
						size="large"
						value="UI Toolkits"
						href="https://github.com/enw860/IApps/tree/main/client/controls/vue"
					/>
					that were writen in Vue.
				</p>

                <p>
					The toolkits were designed for minimizing the amount of effot 
                    that spend on writting basic UI components while building a 
                    website. Those high quality toolkits will handle not only the 
                    UI details but also provide a standardlize UX experience across 
                    all of your pages. This webapp is an example of using these UI
                    toolkits for that purpose, you will see the power of the concept
                    while you exploring the app.
				</p>
			</div>
		</section>

		<section class="Bullet-point">
			<DisplayText class="BP-title" value="Features" />
			<div class="BP-body">
                <p>
					You could use this app as a playground of seeing how the toolkits
                    performed in run time, then copy and paste the code snippet in
                    your app as a quick startup.
				</p>

                <p>
					All of the desiginated color style for controls are themeable, 
                    which means you can change the color of the pre-defined color
                    style as your wish.
				</p>

				<p>
					As per UI components listed in the navigation bar, it will
					describe the component in following dimentions:
                    <ul>
                        <li>
                            <div class="Feature-row">
                                <strong>Overview: </strong>
                                <span>The designiated use cases for the control.</span>
                            </div>
                        </li>
                        <li>
                            <div class="Feature-row">
                                <strong>Live demo: </strong>
                                <span>The demonstration of the control in run time.</span>
                            </div>
                        </li>
                        <li>
                            <div class="Feature-row">
                                <strong>Controls: </strong>
                                <span>Part of the configeration options used for manipulate the control.</span>
                            </div>
                        </li>
                        <li>
                            <div class="Feature-row">
                                <strong>Code: </strong>
                                <span>The actual code for configure the target control.</span>
                            </div>
                        </li>
                        <li>
                            <div class="Feature-row">
                                <strong>Settings: </strong>
                                <span>All of the configurable fields with default values.</span>
                            </div>
                        </li>
                        <li>
                            <div class="Feature-row">
                                <strong>Events: </strong>
                                <span>Desiginated events that could be bind to the control. (if any)</span>
                            </div>
                        </li>
                        <li>
                            <div class="Feature-row">
                                <strong>Methods: </strong>
                                <span>Buildin functions that could be called by referring the control. (if any)</span>
                            </div>
                        </li>
                    </ul>
				</p>
			</div>
		</section>
	</div>
</template>

<script>
import store from "../store/store";
import DisplayText from "../../controls/vue/infomational/DisplayText.vue";
import Link from "../../controls/vue/infomational/Link.vue";

export default {
	name: "Welcome",
	components: {
		DisplayText,
		Link,
	},
	methods: {},
};
</script>