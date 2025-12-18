export default function Overlay({ inside, setInside }) {
	return (
		<>
			<header>
				<img draggable={false} width="100%" src={`${process.env.PUBLIC_URL}/merry_xmas.svg`} />
			</header>
			<footer className="footer">
				<button
					className="button--explore"
					onClick={() => {
						setInside(!inside);
					}}>
          滚动进入内部
				</button>
				<br />
        Created with love by LanM.
			</footer>
		</>
	);
}