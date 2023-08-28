type JokeProps = {
  value: string;
};

export class Joke {
  static create(props: JokeProps) {
    return new Joke(props);
  }

  constructor(private readonly props: JokeProps) {}

  get value(): string {
    return this.props.value;
  }

  toDTO = () => ({
    value: this.value,
  });
}
