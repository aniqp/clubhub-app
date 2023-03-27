import { render, screen } from "@testing-library/react";
import { Application } from "./Application";
import { useParams } from "react-router-dom";
import { useAuthHeader } from "../Firebase";
import "@testing-library/jest-dom/extend-expect";

const testMembers = [
  { name: "John Doe", role: "pending", uid: "12345" },
  { name: "Jane Doe", role: "user", uid: "67890" },
  { name: "Joe Doe", role: "admin", uid: "13579" },
  { name: "Jill Doe", role: "pending", uid: "24680" },
];
// Mock the functions that are called in the component
const refetchMembers = jest.fn();
jest.mock("react-router-dom", () => ({ useParams: jest.fn() }));
jest.mock("../Firebase", () => ({ useAuthHeader: jest.fn() }));
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        accepted: false,
      }),
    text: () => Promise.resolve(""),
    status: 200,
  })
);
useAuthHeader.mockImplementation(() => jest.fn(() => "Bearer 12345"));
useParams.mockImplementation(() => ({ clubID: "1" }));

describe("Application", () => {
  it("renders when admin", () => {
    render(<Application isAdmin={true} />);
    expect(
      screen.getByText("Application", { exact: false })
    ).toBeInTheDocument();
  });
  it("fetches getApplicationType API on render", () => {
    expect(global.fetch.mock.calls.at(-1)[0]).toBe("/api/getApplicationType/1");
  });

  it("does not render when not admin", () => {
    render(<Application isAdmin={false} />);
    expect(screen.queryByText("Application", { exact: false })).toBeNull();
  });

  it("renders a list of applicants", () => {
    render(<Application members={testMembers} isAdmin={true} />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.queryByText("Jane Doe")).toBeNull();
  });

  it("calls acceptUser API when Accept Button is clicked", async () => {
    render(
      <Application
        members={testMembers}
        isAdmin={true}
        refetchMembers={refetchMembers}
      />
    );
    const acceptButton = screen.getAllByText("Accept", { exact: false });
    acceptButton[0].click();
    expect(global.fetch.mock.calls.at(-1)[0]).toBe("/api/acceptUser");
    expect(global.fetch.mock.calls.at(-1)[1]["body"]).toBe(
      JSON.stringify({ user: testMembers[0], clubID: "1" })
    );
  });

  it("calls denyUser API when Deny Button is clicked", async () => {
    render(
      <Application
        members={testMembers}
        isAdmin={true}
        refetchMembers={refetchMembers}
      />
    );
    const denyButton = screen.getAllByText("Deny", { exact: false });
    denyButton[0].click();
    expect(global.fetch.mock.calls.at(-1)[0]).toBe("/api/denyUser");
    expect(global.fetch.mock.calls.at(-1)[1]["body"]).toBe(
      JSON.stringify({ user: testMembers[0], clubID: "1" })
    );
  });

});
