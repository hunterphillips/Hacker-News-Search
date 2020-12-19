import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders HN Search header", () => {
	render(<App />);
	const headerText = screen.getByText(/HN Search/i);
	expect(headerText).toBeInTheDocument();
});
