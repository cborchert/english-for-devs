<script lang="ts">
	export let progress: number = 0;
	export let variant: 'primary' | 'secondary' | 'tertiary' | 'gradient' = 'primary';

	const variantClassNames = {
		primary: 'progress-bar--primary',
		secondary: 'progress-bar--secondary',
		tertiary: 'progress-bar--tertiary',
		gradient: 'progress-bar--gradient'
	};

	$: className = ['progress-bar', variantClassNames[variant]].join(' ');
</script>

<div class={className}>
	<div class="progress-bar__progress" style="width: {progress}%" />
</div>

<style lang="scss">
	@use '$lib/styles/_utilities.scss';
	.progress-bar {
		background-color: var(--color-background-alt-light);
		border-radius: var(--border-radius);
		height: 7px;
		overflow: hidden;

		.progress-bar__progress {
			min-width: 0;
			max-width: 100%;
			background-color: var(--color-primary);
			height: 100%;
			transition: width 0.2s ease-in-out;
		}

		&.progress-bar--primary {
			.progress-bar__progress {
				background-color: var(--color-primary);
			}
		}

		&.progress-bar--secondary {
			.progress-bar__progress {
				background-color: var(--color-secondary);
			}
		}

		&.progress-bar--tertiary {
			.progress-bar__progress {
				background-color: var(--color-tertiary);
			}
		}

		&.progress-bar--gradient {
			.progress-bar__progress {
				@extend .with-background-gradient-bright;
			}
		}
	}
</style>
